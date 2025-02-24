import Button from '../button/Button';

const Tag = ({name, onClick, isActive}) => {
  return (
    <Button onClick={onClick} type={isActive ? 'secondary-active' : 'secondary'}>
      {name}
    </Button>
  );
};

export default Tag;
