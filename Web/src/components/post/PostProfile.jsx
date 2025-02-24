import {Link} from 'react-router-dom';
import './PostProfile.css';

const PostProfile = ({id, video, title, description}) => {
  return (
    <div className="postProfile">
      <Link to={`/post/${id}`}>
        <video className="postProfile-video" src={video} />
      </Link>

      <div className="postProfile-header">
        <div className="postProfile-info">
          <Link to={`/post/${id}`}>
            <span>
              {title}
              <br />
              {description}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostProfile;
