import {setTokenToLocalStorage} from '../../utils/localStorage.js';
import {useNavigate} from 'react-router-dom';
import {Navbar} from '../../components/navbar/Navbar.jsx';
import {useState} from 'react';
import SideBar from '../../components/sideBar/SideBar.jsx';
import LogIn from '../../components/cards/LogIn.jsx';
import api from '../../utils/api.js';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmitLogin = (username, password) => {
    api
      .login({username, password})
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
      <Navbar auth={null} />
      <div className="login-container">
        <SideBar />
        <div className="login-container-card">
          <LogIn handleSubmitLogin={handleSubmitLogin} error={error} />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
