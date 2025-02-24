import { useState } from 'react';
import Button from '../button/Button';
import Input from '../input/Input';

const EditPost = ({handleSubmitPostEdit, error, post}) => {

  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [video, setVideo] = useState(post.video);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSubmitPostEdit({title, description, video});    
    setIsEmpty(!title || !description || !video);
  };

  return (
    <form className='card'>
      <div className='card-content'>
        {!isEmpty && error ? <p>{error}</p> : null}
        <label>Title</label>
        <Input type='text' placeholder='title' onChange={handleTitleChange} defaultValue={post.title}/>
        {!title && isEmpty ? <p>This field is required</p> : null}
      </div>
      <div className='card-content'>
        <label>Description</label>
        <Input type='text' placeholder='description' onChange={handleDescriptionChange} defaultValue={post.description}/>
        {!description && isEmpty ? <p>This field is required</p> : null}
      </div>
      <div className='card-content'>
        <label>Video</label>
        <Input type='text' placeholder='video' onChange={handleVideoChange} defaultValue={post.video}/>
        {!video && isEmpty ? <p>This field is required</p> : null}
      </div>
      <div className='card-button'>
        <Button type='primary' onClick={handleSubmit}>Edit post</Button>
      </div>
    </form>
  )
};

export default EditPost;