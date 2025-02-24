import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Navbar} from '../../components/navbar/Navbar.jsx';
import CommentSection from '../../components/commentSection/CommentSection.jsx';
import SideBar from '../../components/sideBar/SideBar.jsx';
import Spinner from '../../components/spinner/Spinner.jsx';
import Api from '../../utils/api.js';
import './PostPage.css';
import './PageResponsiveStyle.css';
import {isUserAlreadyFollowing} from '../../utils/follow.js';
import {getTokenFromLocalStorage} from '../../utils/localStorage.js';
import Modal from '../../components/modal/Modal.jsx';

const PostPage = () => {
  const params = useParams();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [userFollows, setUserFollows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const token = getTokenFromLocalStorage();

    Api.getPost(params.postId)
      .then(data => {
        setPost(data);
        if (token) {
          Api.getUser(token)
            .then(response => {
              setUserFollows(response.following);
              setUser({id: response.id, username: response.username, token, image: response.image});
            })
            .catch(e => {
              setModalMessage(e.message);
            });
        }
      })
      .catch(e => {
        setModalMessage(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.postId]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar user={user} />
      <div className="page-container">
        <SideBar user={user} />
        <div className="page-container-content">
          <div className="page-container-content-body">
            <video src={post?.video} alt="post" autoPlay loop controls />
            <CommentSection
              user={user}
              post={post}
              isUserAlreadyFollowing={isUserAlreadyFollowing(userFollows, post.user.id)}
              setModalMessage={setModalMessage}
            />
          </div>
        </div>
      </div>
      {modalMessage && <Modal message={modalMessage} setModalMessage={setModalMessage} />}
    </>
  );
};

export default PostPage;
