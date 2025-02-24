import {setTokenToLocalStorage} from '../../utils/localStorage.js';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {Navbar} from '../../components/navbar/Navbar.jsx';
import Register from '../../components/cards/Register.jsx';
import SideBar from '../../components/sideBar/SideBar.jsx';
import api from '../../utils/api.js';
import './LoginPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmitRegister = (username, password, email, image) => {
    api
      .register({username, password, email, image})
      .then(response => {
        setTokenToLocalStorage(response.headers['authorization']);
        navigate('/', {replace: true});
      })
      .catch(error => {
        setError(error.response.data.title);
      });
  };

  return (
    <>
      <Navbar user="" />
      <div className="login-container">
        <SideBar />
        <div className="login-container-card">
          <Register handleSubmitRegister={handleSubmitRegister} error={error} />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
