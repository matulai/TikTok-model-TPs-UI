import {Navbar} from '../../components/navbar/Navbar.jsx';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import SideBar from '../../components/sideBar/SideBar.jsx';
import Friend from '../../components/friend/Friend.jsx';
import PostExplore from '../../components/post/PostExplore.jsx';
import Spinner from '../../components/spinner/Spinner.jsx';
import Api from '../../utils/api.js';
import './SearchPage.css';
import {getTokenFromLocalStorage} from '../../utils/localStorage.js';
import Modal from '../../components/modal/Modal.jsx';

const SearchPage = () => {
  const text = useParams().text;
  const [searchText, setSearchText] = useState(text);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [auth, setAuth] = useState(null);
  const [userFollows, setUserFollows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState('');

  const handleSearch = searchValue => {
    setSearchText(searchValue);
  };

  useEffect(() => {
    const token = getTokenFromLocalStorage();

    Api.searchUsersAndPosts(searchText)
      .then(data => {
        setUsers(data.users);
        setPosts(data.posts);
        if (token) {
          Api.getUser(token)
            .then(response => {
              setAuth({id: response.id, username: response.username, token});
              setUserFollows(response.following);
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
  }, [searchText]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar user={auth} handleSearch={handleSearch} />
      <div className="search-page-container">
        <SideBar user={auth} />
        <div className="search-container-content">
          <div className="search-container-content-body flex-d-c">
            <div className="search-container-content-body-searchText">
              Search: <b>{searchText}</b>
            </div>
            <span className="search-container-content-body-text">Users</span>
            <div className="search-container-content-body-users">
              {users.map(user => (
                <Friend
                  key={user.id}
                  setAuth={setAuth}
                  id={user.id}
                  image={user.image}
                  username={user.username}
                  userFollows={userFollows}
                  setUserFollows={setUserFollows}
                  user={auth}
                  setModalMessage={setModalMessage}
                />
              ))}
            </div>
            <span className="search-container-content-body-text">Posts</span>
            <div className="search-container-content-body-posts">
              {posts.map(post => (
                <PostExplore
                  key={post.id}
                  auth={auth}
                  id={post.id}
                  userPost={post.user}
                  title={post.title}
                  descrption={post.descrption}
                  video={post.video}
                  likes={post.likes}
                  user={auth}
                />
              ))}
            </div>
          </div>
        </div>
        {modalMessage && <Modal message={modalMessage} setModalMessage={setModalMessage} />}
      </div>
    </>
  );
};

export default SearchPage;
