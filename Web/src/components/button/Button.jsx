import './buttons.css';

function Button({children, type, onClick}) {
  const styles = {
    primary: 'button-rectangle button-primary',
    'primary-outline': 'button-rectangle button-primary-outline',
    secondary: 'button-rectangle button-secondary',
    'secondary-active': 'button-rectangle button-secondary-active',
    'secondary-outline': 'button-rectangle button-secondary-outline',
    user: 'button-circle button-primary',
    actions: 'button-circle button-actions',
    'actions-wh-36': 'button-circle button-actions wh-36',
  };

  const className = styles[type] || '';

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
