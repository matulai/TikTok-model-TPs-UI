import {useEffect, useState} from 'react';
import api from '../../utils/api';
import Tag from '../../components/tag/Tag';
import {Navbar} from '../../components/navbar/Navbar';
import SideBar from '../../components/sideBar/SideBar';
import PostExplore from '../../components/post/PostExplore';
import './ExplorePage.css';
import Spinner from '../../components/spinner/Spinner';
import {getTokenFromLocalStorage} from '../../utils/localStorage';
import Modal from '../../components/modal/Modal';

const ExplorePage = () => {
  const [user, setUser] = useState(null);
  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const [actualTagIndex, setActualTagIndex] = useState(null);
  const [isLoadingTags, setIsLoadingTags] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    api
      .getTopTenTrends()
      .then(data => {
        setTags(data);
        setActualTagIndex(0);
      })
      .catch(e => setModalMessage(e.message));

    const token = getTokenFromLocalStorage();
    if (token) {
      api
        .getUser(token)
        .then(response => {
          setUser({id: response.id, username: response.username, token});
        })
        .catch(e => {
          setModalMessage(e.message);
        });
    }

    setIsLoadingTags(false);
  }, []);

  useEffect(() => {
    if (actualTagIndex !== null) {
      setIsLoadingPosts(true);
      api
        .getPostByTrend(tags[actualTagIndex].substring(1))
        .then(data => setPosts(data))
        .catch(e => setModalMessage(e.message));
    }
    setIsLoadingPosts(false);
  }, [actualTagIndex, tags]);

  const handleTagClick = tagIndex => {
    setActualTagIndex(tagIndex);
  };

  if (isLoadingPosts || isLoadingTags) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar user={user} />
      <div className="explore-container">
        <SideBar user={user} activeItem={3} />
        <div className="explore-content">
          <div className="tags-container">
            {isLoadingTags
              ? 'loading'
              : tags.map((tag, i) => (
                  <Tag
                    key={tag}
                    name={tag}
                    onClick={() => handleTagClick(i)}
                    isActive={i === actualTagIndex}
                  />
                ))}
          </div>
          <div className="posts-tag-container">
            {posts?.map(post => (
              <PostExplore
                key={post.id}
                id={post.id}
                userPost={post.user}
                title={post.title}
                descrption={post.description}
                video={post.video}
                likes={post.likes}
                user={user}
                setModalMessage={setModalMessage}
              />
            ))}
          </div>
        </div>
        {modalMessage && <Modal message={modalMessage} setModalMessage={setModalMessage} />}
      </div>
    </>
  );
};

export default ExplorePage;
