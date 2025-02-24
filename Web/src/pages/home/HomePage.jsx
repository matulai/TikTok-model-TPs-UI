import SideBar from '../../components/sideBar/SideBar.jsx';
import './HomePage.css';
import {Navbar} from '../../components/navbar/Navbar.jsx';
import {useEffect} from 'react';
import api from '../../utils/api.js';
import {useState} from 'react';
import PostsContainer from '../../components/post/PostsContainer.jsx';
import {getTokenFromLocalStorage} from '../../utils/localStorage.js';
import Spinner from '../../components/spinner/Spinner.jsx';
import Modal from '../../components/modal/Modal.jsx';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userFollows, setUserFollows] = useState([]);
  const [user, setUser] = useState(null);
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
    }

    api
      .getLastestPosts()
      .then(data => {
        setPosts(data);
      })
      .catch(e => {
        setModalMessage(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar user={user} />
      <div className="home-container">
        <SideBar user={user} activeItem={0} />
        <PostsContainer
          posts={posts}
          userFollows={userFollows}
          setUserFollows={setUserFollows}
          isLoading={isLoading}
          user={user}
          setModalMessage={setModalMessage}
        />
        {modalMessage && <Modal message={modalMessage} setModalMessage={setModalMessage} />}
      </div>
    </>
  );
};

export default HomePage;
