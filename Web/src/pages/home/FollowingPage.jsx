import {useEffect, useState} from 'react';
import SideBar from '../../components/sideBar/SideBar';
import {Navbar} from '../../components/navbar/Navbar';
import PostsContainer from '../../components/post/PostsContainer';
import api from '../../utils/api';
import Spinner from '../../components/spinner/Spinner';
import {getTokenFromLocalStorage} from '../../utils/localStorage';
import Modal from '../../components/modal/Modal';

const FollowingPage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userFollows, setUserFollows] = useState([]);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      api
        .getUser(token)
        .then(response => {
          setUserFollows(response.following);
          setUser({id: response.id, username: response.username, token});
        })
        .catch(e => {
          setModalMessage(e.message);
        });

      api
        .getTimeline(token)
        .then(data => {
          setPosts(data);
        })
        .catch(e => {
          setModalMessage(e.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar user={user} />
      <div className="home-container">
        <SideBar user={user} activeItem={1} />
        <PostsContainer
          posts={posts}
          user={user}
          setUserFollows={setUserFollows}
          userFollows={userFollows}
          isLoading={isLoading}
          setModalMessage={setModalMessage}
        />
        {modalMessage && <Modal message={modalMessage} setModalMessage={setModalMessage} />}
      </div>
    </>
  );
};

export default FollowingPage;
