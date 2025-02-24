import {useEffect, useState} from 'react';
import {Navbar} from '../../components/navbar/Navbar';
import Spinner from '../../components/spinner/Spinner';
import SideBar from '../../components/sideBar/SideBar';
import Friend from '../../components/friend/Friend';
import './FriendsPage.css';
import api from '../../utils/api';
import {getTokenFromLocalStorage} from '../../utils/localStorage';
import Modal from '../../components/modal/Modal';

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [follows, setFollows] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (!token) return;
    api
      .getUser(token)
      .then(response => {
        setUser({id: response.id, username: response.username, token});

        const followers = response.followers;
        const following = response.following;

        setFollows(following);

        setFriends(
          following.filter(following => followers.some(follower => follower.id === following.id))
        );
      })
      .catch(e => {
        setModalMessage(e.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar user={user} />
      <div className="friends-container">
        <SideBar user={user} activeItem={2} />
        <div className="friends-content">
          {friends.map(friend => (
            <Friend
              key={friend.id}
              id={friend.id}
              username={friend.username}
              image={friend.image}
              userFollows={follows}
              setUserFollows={setFollows}
              user={user}
              setModalMessage={setModalMessage}
            />
          ))}
        </div>
        {modalMessage && <Modal message={modalMessage} setModalMessage={setModalMessage} />}
      </div>
    </>
  );
};

export default FriendsPage;
