import './Friend.css';
import Button from '../button/Button';
import {Link, useNavigate} from 'react-router-dom';
import api from '../../utils/api';
import {isUserAlreadyFollowing} from '../../utils/follow';

const Friend = ({id, image, username, userFollows, setUserFollows, user, setModalMessage}) => {
  const isFollowing = isUserAlreadyFollowing(userFollows, id);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!user) {
      return navigate('/login');
    }

    api
      .toggleFollowUser(user.token, id)
      .then(data => {
        setUserFollows(data.following);
      })
      .catch(e => {
        setModalMessage(e.message);
      });
  };

  return (
    <div className="friend">
      <div className="friend-header">
        <Link to={`/user/${id}`}>
          <img className="friend-avatar" src={image} alt="Imagen de amigo" />
        </Link>
        <Link to={`/user/${id}`}>
          <span>{username}</span>
        </Link>
        <Button type={isFollowing ? 'primary-outline' : 'primary'} onClick={handleClick}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      </div>
    </div>
  );
};

export default Friend;
