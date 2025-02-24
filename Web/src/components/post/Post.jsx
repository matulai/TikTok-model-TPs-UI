import './Post.css';
import {HeartIcon} from '../icons/HeartIcon';
import {ChatIcon} from '../icons/ChatIcon';
import {ShareIcon} from '../icons/ShareIcon';
import PostHeader from './PostHeader.jsx';
import ActionItem from './ActionItem.jsx';
import api from '../../utils/api.js';
import {Link, useNavigate} from 'react-router-dom';
import {isPostAlreadyLiked} from '../../utils/follow.js';

const Post = ({
  id,
  postUser,
  video,
  title,
  description,
  likes,
  commentsAmount,
  isUserAlreadyFollowing,
  userFollows,
  setUserFollows,
  user,
  setModalMessage,
}) => {
  const navigate = useNavigate();

  const handleClickLike = () => {
    if (!user) {
      return navigate('/login');
    }
    api.toggleLikeOnPost(user.token, id).catch((e) => {
      setModalMessage(e.message);
    })
  };

  const handleClickShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${id}`);
  };

  return (
    <div className="post">
      <PostHeader
        postUser={postUser}
        title={title}
        description={description}
        isUserAlreadyFollowing={isUserAlreadyFollowing}
        userFollows={userFollows}
        setUserFollows={setUserFollows}
        user={user}
        setModalMessage={setModalMessage}
      />

      <div className="post-body">
        <Link to={`/post/${id}`}>
          <video className="post-body-image" src={video} alt="post" autoPlay loop />
        </Link>
        <div className="post-body-actions">
          <ActionItem
            isInitiallyLiked={isPostAlreadyLiked(user, likes)}
            numberOfInteractions={likes.length}
            icon={HeartIcon}
            onClick={handleClickLike}
          />
          <Link to={`/post/${id}`}>
            <ActionItem numberOfInteractions={commentsAmount} icon={ChatIcon} />
          </Link>
          <ActionItem icon={ShareIcon} onClick={handleClickShare} />
        </div>
      </div>
    </div>
  );
};

export default Post;
