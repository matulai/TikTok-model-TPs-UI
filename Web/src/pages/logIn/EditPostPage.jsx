import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Navbar} from '../../components/navbar/Navbar.jsx';
import EditPost from '../../components/cards/EditPost.jsx';
import Spinner from '../../components/spinner/Spinner.jsx';
import SideBar from '../../components/sideBar/SideBar.jsx';
import api from '../../utils/api.js';
import './LoginPage.css';
import {getTokenFromLocalStorage} from '../../utils/localStorage.js';

const EditPostPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    api
      .getPost(params.postId)
      .then(post => {
        setPost(post);
        api
          .getUser(token)
          .then(response => {
            setUser({id: response.id, username: response.username, token});
          })
          .catch(e => {
            setError(e.message);
          });
      })
      .catch(e => {
        setError(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.postId]);

  const handleSubmitPostEdit = postBody => {
    api
      .updatePost(user.token, params.postId, postBody)
      .then(() => {
        navigate(`/post/${params.postId}`, {replace: true});
      })
      .catch(error => {
        setError(error.response.data.title);
      });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar user={user} />
      <div className="login-container">
        <SideBar user={user} />
        <div className="login-container-card">
          <EditPost handleSubmitPostEdit={handleSubmitPostEdit} error={error} post={post} />
        </div>
      </div>
    </>
  );
};

export default EditPostPage;
