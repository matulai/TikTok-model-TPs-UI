import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import api from '../../utils/api';
import {Navbar} from '../../components/navbar/Navbar';
import SideBar from '../../components/sideBar/SideBar';
import UserProfile from '../../components/userProfile/UserProfile';
import './ProfilePage.css';
import PostProfile from '../../components/post/PostProfile';
import Spinner from '../../components/spinner/Spinner';
import {getTokenFromLocalStorage} from '../../utils/localStorage';
import Modal from '../../components/modal/Modal';

const ProfilePage = () => {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const userProfileID = params.userId;
    const token = getTokenFromLocalStorage();

    api.getUserById(userProfileID).then(response => {
      setProfileUser(response);
      api
        .getUser(token)
        .then(response => {
          setUser({id: response.id, username: response.username, token});
        })
        .catch(e => {
          setModalMessage(e.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  }, [params.userId]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar user={user} />
      <div className="profile-container">
        <SideBar user={user} activeItem={4} />
        <div className="profile-content">
          <UserProfile
            id={profileUser.id}
            image={profileUser.image}
            username={profileUser.username}
            followingAmount={profileUser.following.length}
            followers={profileUser.followers}
            user={user}
            setModalMessage={setModalMessage}
          />
          <div className="profile-posts">
            {profileUser?.posts.map(post => (
              <PostProfile
                key={post.id}
                id={post.id}
                title={post.title}
                description={post.description}
                video={post.video}
              />
            ))}
          </div>
        </div>
        {modalMessage && <Modal message={modalMessage} setModalMessage={setModalMessage} />}
      </div>
    </>
  );
};

export default ProfilePage;
