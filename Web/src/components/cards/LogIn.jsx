import { useState } from 'react';
import Button from '../button/Button';
import Input from '../input/Input';
import './Cards.css';

const LogIn = ({handleSubmitLogin, error}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSubmitLogin(username, password);
    setIsEmpty(!username || !password)
  };

  return (
    <form className='card'>
      <div className='card-content'>
        {!isEmpty && error ? <p>{error}</p> : null}
        <label>Username</label>
        <Input type='text' placeholder='Username' onChange={handleUsernameChange}/>
        {!username && isEmpty? <p>This field is required</p> : null}
      </div>
      <div className='card-content'>
        <label>Password</label>
        <Input type='password' placeholder='Password' onChange={handlePasswordChange}/>
        {!password && isEmpty? <p>This field is required</p> : null}
      </div>
      <div className='card-button'>
        <Button type='primary' onClick={handleSubmit}>Log In</Button>
      </div>
    </form>
  )
};

export default LogIn;