import './UserProfile.css';
import Button from '../button/Button';
import api from '../../utils/api';
import {useNavigate} from 'react-router-dom';
import {isUserAlreadyFollowing} from '../../utils/follow';
import {useState} from 'react';
import {removeTokenFromLocalStorage} from '../../utils/localStorage';

const UserProfile = ({id, image, username, followingAmount, followers, user, setModalMessage}) => {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(isUserAlreadyFollowing(followers, user?.id));

  const isOwnProfile = user?.id === id;

  const handleClick = () => {
    if (user?.id === id) {
      removeTokenFromLocalStorage();
      navigate('/login');
    } else {
      api
        .toggleFollowUser(user?.token, id)
        .then(() => {
          setIsFollowing(prevState => !prevState);
        })
        .catch(e => {
          setModalMessage(e.message);
        });
    }
  };

  return (
    <div className="userProfile">
      <div className="userProfile-header">
        <div className="userProfile-userInfo">
          <img className="userProfile-avatar" src={image} alt="Imagen de amigo" />
          <b>{username}</b>
        </div>

        <Button
          type={isFollowing || isOwnProfile ? 'primary-outline' : 'primary'}
          onClick={handleClick}
        >
          {isOwnProfile ? 'Log out' : isFollowing ? 'Unfollow' : 'Follow'}
        </Button>

        <div className="userProfile-footer">
          <span>
            <b className="userProfile-follows-amount">{followingAmount}</b> Follow
          </span>
          <span>
            <b className="userProfile-follows-amount">{followers.lenght}</b> Followers
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
