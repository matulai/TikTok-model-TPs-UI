import {Link} from 'react-router-dom';
import './UserComment.css';

const Comment = ({user, commentContent}) => {
  return (
    <div className="userComment">
      <Link to={`/user/${user.id}`}>
        <img src={user.image} alt="avatar" className="userComment-avatar" />
      </Link>
      <div className="userComment-body">
        <Link to={`/user/${user.id}`}>
          <b>{user.username}</b>
        </Link>
        <span>{commentContent}</span>
      </div>
    </div>
  );
};

export default Comment;
