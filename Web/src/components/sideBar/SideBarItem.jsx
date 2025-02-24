import {Link} from 'react-router-dom';
import './SideBar.css';

function SideBarItem({text, href, icon: Icon, isActive}) {
  return (
    <Link to={href} className="sideBar-nav-list-link">
      <Icon color={isActive ? 'var(--color-pink-dark)' : 'var(--color-black)'} />
      <span style={{color: isActive ? 'var(--color-pink-dark)' : 'var(--color-black)'}}>
        {text}
      </span>
    </Link>
  );
}

export default SideBarItem;
