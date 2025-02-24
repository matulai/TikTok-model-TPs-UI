import {Link} from 'react-router-dom';
import Button from '../button/Button';
import './Post.css';
import api from '../../utils/api';
import {useNavigate} from 'react-router-dom';
import {isUserAlreadyFollowing} from '../../utils/follow';

function PostHeader({
  postUser,
  title,
  description,
  userFollows,
  setUserFollows,
  user,
  setModalMessage,
}) {
  const isFollowing = isUserAlreadyFollowing(userFollows, postUser.id);
  const navigate = useNavigate();

  const handleFollow = () => {
    if (!user) {
      return navigate('/login');
    }
    api
      .toggleFollowUser(user.token, postUser.id)
      .then(data => {
        setUserFollows(data.following);
      })
      .catch((e) => {
        setModalMessage(e.message);
      });
  };

  return (
    <div className="post-header">
      <Link to={`/user/${postUser.id}`}>
        <img src={postUser.image} alt="avatar" className="post-avatar" />
      </Link>
      <div className="post-header-body">
        <Link to={`/user/${postUser.id}`}>
          <b>{postUser.username}</b>
        </Link>
        <span>
          {title}
          <br />
          {description}
        </span>
      </div>

      <Button type={!isFollowing ? 'primary' : 'primary-outline'} onClick={handleFollow}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    </div>
  );
}

export default PostHeader;
