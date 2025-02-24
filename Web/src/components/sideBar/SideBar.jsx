import './SideBar.css';
import {HomeIcon} from '../icons/HomeIcon';
import {FollowingIcon} from '../icons/FollowingIcon';
import {FriendsIcon} from '../icons/FriendsIcon';
import {ExploreIcon} from '../icons/ExploreIcon';
import {ProfileIcon} from '../icons/ProfileIcon';
import Button from '../button/Button';
import SideBarItem from './SideBarItem.jsx';
import {useNavigate} from 'react-router-dom';

const SideBar = ({user,activeItem}) => {
  const navigate = useNavigate();
  return (
    <div className="sideBar">
      <nav className="sideBar-nav">
        <ul className="sideBar-nav-list">
          <SideBarItem text="For You" href="/" icon={HomeIcon} isActive={activeItem === 0} />
          <SideBarItem
            text="Following"
            href="/following"
            icon={FollowingIcon}
            isActive={activeItem === 1}
          />
          <SideBarItem
            text="Friends"
            href="/friends"
            icon={FriendsIcon}
            isActive={activeItem === 2}
          />
          <SideBarItem
            text="Explore"
            href="/explore"
            icon={ExploreIcon}
            isActive={activeItem === 3}
          />
          {/* Como la ruta necesita el id del usuario y este puede ser null,
          se debe validar si el usuario esta logueado para mostrar el link.
          En los otros casos que son rutas protegidas la redireccion se realiza
          cuando se monta la pagina protegida */}
          <SideBarItem
            text="Profile"
            href={user ? `/user/${user.id}` : '/user/me'}
            icon={ProfileIcon}
            isActive={activeItem === 4}
          />
        </ul>
      </nav>
      {!user && (
        <div className="sideBar-logIn">
          <p>Log in to follow creators, like videos, and view comments</p>
          <Button type="primary-outline" onClick={() => navigate('/login')}>
            Log In
          </Button>
        </div>
      )}
    </div>
  );
};

export default SideBar;
