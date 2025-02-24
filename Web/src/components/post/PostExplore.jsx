import {HeartIcon} from '../icons/HeartIcon';
import {useState} from 'react';
import './PostExplore.css';
import Button from '../button/Button';
import {Link, useNavigate} from 'react-router-dom';
import api from '../../utils/api';
import {isPostAlreadyLiked} from '../../utils/follow';

const PostExplore = ({id, userPost, title, descrption, video, likes, user, setModalMessage}) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const isInitiallyLiked = isPostAlreadyLiked(user, likes);

  const handleClick = () => {
    if (!user) {
      return navigate('/login');
    }
    api
      .toggleLikeOnPost(user.token, id)
      .then(() => {
        setIsClicked(prevState => !prevState);
      })
      .catch(e => {
        setModalMessage(e.message);
      });
  };

  const showHeart = isClicked !== isInitiallyLiked;
  const canIncrement = isClicked && !isInitiallyLiked;
  const canDecrement = isClicked && isInitiallyLiked;

  const count = likes.length + (canIncrement ? 1 : 0) - (canDecrement ? 1 : 0);

  return (
    <div className="post-explore">
      <Link to={`/post/${id}`}>
        <video className="post-explore-video" src={video} alt="Video del post" autoPlay loop />
      </Link>
      <div className="post-explore-header">
        <div className="post-explore-info">
          <span>
            {title}
            <br />
            {descrption}
          </span>
        </div>
        <div className="post-explore-footer">
          <div className="post-explore-user-info">
            <Link to={`/user/${userPost.id}`}>
              <img
                className="post-explore-user-avatar"
                src={userPost.image}
                alt="Imagen de usuario"
              />
            </Link>
            <Link to={`/user/${userPost.id}`}>
              <b>{userPost.username}</b>
            </Link>
          </div>
          <div className="post-explore-like">
            <Button type="actions-wh-36" onClick={handleClick}>
              <HeartIcon color={showHeart ? 'var(--color-pink-medium)' : 'var(--color-black)'} />
            </Button>
            {count}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostExplore;
