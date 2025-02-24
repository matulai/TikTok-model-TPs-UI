import { useState } from 'react';
import Button from '../button/Button';
import Input from '../input/Input';

const Register = ({handleSubmitRegister, error}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSubmitRegister(username, password, email, image);
    setIsEmpty(!username || !password || !email || !image)
  };

  return (
    <form className='card'>
      <div className='card-content'>
        {!isEmpty && error ? <p>{error}</p> : null}
        <label>Username</label>
        <Input type='text' placeholder='username' onChange={handleUsernameChange}/>
        {!username && isEmpty? <p>This field is required</p> : null}
      </div>
      <div className='card-content'>
        <label>Password</label>
        <Input type='password' placeholder='password' onChange={handlePasswordChange}/>
        {!password && isEmpty? <p>This field is required</p> : null}
      </div>
      <div className='card-content'>
        <label>Email</label>
        <Input type='email' placeholder='email' onChange={handleEmailChange}/>
        {!email && isEmpty? <p>This field is required</p> : null}
      </div>
      <div className='card-content'>
        <label>Image</label>
        <Input type='text' placeholder='image' onChange={handleImageChange}/>
        {!image && isEmpty? <p>This field is required</p> : null}
      </div>
      <div className='card-button'>
        <Button type='primary' onClick={handleSubmit}>Register</Button>
      </div>
    </form>
  )
};

export default Register;