import {HeartIcon} from '../icons/HeartIcon';
import {ChatIcon} from '../icons/ChatIcon';
import {ShareIcon} from '../icons/ShareIcon';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import UserComment from '../userComment/UserComment';
import Button from '../button/Button';
import api from '../../utils/api';
import './CommentSection.css';
import {isPostAlreadyLiked} from '../../utils/follow';

const CommentSection = ({user, post, isUserAlreadyFollowing, setModalMessage}) => {
  const [isLikeClicked, setLikeClicked] = useState(isPostAlreadyLiked(user, post.likes));
  const [isFollowing, setIsFollowing] = useState(isUserAlreadyFollowing);
  const [countLikes, setCountLikes] = useState(post.likes.length);
  const [commentText, setCommentText] = useState('');
  const [commentList, setCommentList] = useState([...post.comments].reverse());
  const navigate = useNavigate();

  useEffect(() => {
    setIsFollowing(isUserAlreadyFollowing);
  }, [isUserAlreadyFollowing]);

  const handleClickFollowing = () => {
    if (!user) {
      return navigate('/login');
    }
    api
      .toggleFollowUser(user.token, post.user.id)
      .then(() => {
        setIsFollowing(prevState => !prevState);
      })
      .catch(e => {
        setModalMessage(e.message);
      });
  };

  const handleClickLike = () => {
    if (!user) {
      return navigate('/login');
    }
    setLikeClicked(!isLikeClicked);
    api.toggleLikeOnPost(user.token, post.id).catch(e => {
      setModalMessage(e.message);
    });
    setCountLikes(prevState => prevState + (isLikeClicked ? -1 : 1));
  };

  const handleClickShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
  };

  const handleCommentChange = event => {
    setCommentText(event.target.value);
  };

  const handlePostComment = () => {
    if (commentText.trim() !== '') {
      const newComment = {
        user: user,
        text: commentText,
      };
      setCommentList([newComment, ...commentList]);

      api.addCommentToPost(user.token, post.id, {text: commentText.trim()}).catch(e => {
        setModalMessage(e.message);
      });

      setCommentText('');
    }
  };

  const handlePostEdit = () => {
    navigate(`/post/${post.id}/edit`);
  };

  return (
    <div className="commentsection">
      <div className="commentsection-header">
        <div className="commentsection-header-body">
          <Link to={`/user/${post.user.id}`}>
            <img src={post.user.image} alt="avatar" className="commentsection-header-body-avatar" />
          </Link>
          <div className="commentsection-header-body-info">
            <Link to={`/user/${post.user.id}`}>
              <b>{post.user.username}</b>
            </Link>
            <span>
              {post.title}
              <br />
              {post.description}
            </span>
          </div>
          {user != null && user.id === post.user.id ? (
            <Button type="primary-outline" onClick={handlePostEdit}>
              Edit
            </Button>
          ) : (
            <Button
              type={!isFollowing ? 'primary' : 'primary-outline'}
              onClick={handleClickFollowing}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </div>
      </div>

      <div className="commentsection-interactions">
        <div className="commentsection-interactions-item">
          <button
            className="button-circle button-actions"
            onClick={handleClickLike}
            style={{width: '46px', height: '46px'}}
          >
            <HeartIcon color={isLikeClicked ? 'var(--color-pink-medium)' : 'var(--color-black)'} />
          </button>
          <span>{countLikes}</span>
        </div>
        <div className="commentsection-interactions-item">
          <button className="button-circle button-actions" style={{width: '46px', height: '46px'}}>
            <ChatIcon color="var(--color-black)" />
          </button>
          <span>{commentList.length}</span>
        </div>
        <div className="commentsection-interactions-item">
          <button
            className="button-circle button-actions"
            style={{width: '46px', height: '46px'}}
            onClick={handleClickShare}
          >
            <ShareIcon color="var(--color-black)" />
          </button>
        </div>
      </div>

      <div className="commentsection-usersComments">
        <label className="comentSection-usersComments-info">Comments ({commentList.length})</label>
        <div className="commentsection-usersComments-divider">
          {commentList.map((comment, key) => (
            <UserComment key={key} user={comment.user} commentContent={comment.text} />
          ))}
        </div>
      </div>

      {user != null ? (
        <div className="commentsection-footer">
          <textarea
            className="commentsection-footer-textarea"
            value={commentText}
            onChange={handleCommentChange}
            placeholder="Add comment"
          />
          <button className="commentsection-footer-button" onClick={handlePostComment}>
            Post
          </button>
        </div>
      ) : (
        <div className="commentsection-footer">
          <span>
            <Link to="/login">Log in to comment</Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
