import {getTokenFromLocalStorage} from '../../utils/localStorage.js';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Navbar} from '../../components/navbar/Navbar.jsx';
import CreatePost from '../../components/cards/CreatePost.jsx';
import Spinner from '../../components/spinner/Spinner.jsx';
import SideBar from '../../components/sideBar/SideBar.jsx';
import api from '../../utils/api.js';
import './LoginPage.css';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    api.getUser(token)
      .then(response => {
        setUser({id: response.id, username: response.username, token});
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSubmitPost = (title, description, video) => {
    api
      .createPost(user.token, {title, description, video})
      .then(post => {
        navigate(`/post/${post.id}`, {replace: true});
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
          <CreatePost handleSubmitPost={handleSubmitPost} error={error} />
        </div>
      </div>
    </>
  );
};

export default CreatePostPage;

