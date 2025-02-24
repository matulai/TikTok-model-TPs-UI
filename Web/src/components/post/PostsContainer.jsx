import Spinner from '../spinner/Spinner';
import Post from './Post';
import './PostsContainer.css';

const PostsContainer = ({posts, isLoading, userFollows, setUserFollows, user, setModalMessage}) => {
  return (
    <div className="home-content">
      <div className="posts-container">
        {isLoading ? (
          <Spinner />
        ) : (
          posts.map(post => (
            <Post
              key={post.id}
              id={post.id}
              postUser={post.user}
              title={post.title}
              description={post.description}
              video={post.video}
              likes={post.likes}
              commentsAmount={post.commentsAmount}
              userFollows={userFollows}
              setUserFollows={setUserFollows}
              user={user}
              setModalMessage={setModalMessage}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PostsContainer;
