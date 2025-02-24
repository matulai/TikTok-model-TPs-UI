import SearchInput from '../input/SearchInput.jsx';
import {TiktokIcon} from '../icons/TiktokIcon';
import './Navbar.css';
import Button from '../button/Button';
import {AddIcon} from '../icons/AddIcon';
import {Link} from 'react-router-dom';

export function Navbar({user, handleSearch}) {
  return (
    <nav className="nav-container">
      <Link to="/">
        <TiktokIcon />
      </Link>
      <SearchInput onSearch={handleSearch} />
      {user ? (
        <div className="actions-container">
          <Link to="/createPost">
            <Button type="secondary-outline">
              <AddIcon color="var(--color-black)" /> Upload
            </Button>
          </Link>
          <Link to={`/user/${user.id}`}>
            <Button type="user">{user.username[0].toUpperCase()}</Button>
          </Link>
        </div>
      ) : (
        <div className="actions-container">
          <Link to="/register">
            <Button type="primary">Register</Button>
          </Link>
          <Link to="/login">
            <Button type="primary-outline">Login</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
