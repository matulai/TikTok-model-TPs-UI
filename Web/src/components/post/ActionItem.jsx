import {useState} from 'react';
import Button from '../button/Button';
import './Post.css';

function ActionItem({numberOfInteractions, icon: Icon, isInitiallyLiked, onClick}) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(prevState => !prevState);
    onClick();
  };

  const isLikeButton = isInitiallyLiked !== undefined;
  const showHeart = isClicked !== isInitiallyLiked;
  const canIcrement = isClicked && !isInitiallyLiked;
  const canDecrement = isClicked && isInitiallyLiked;

  const numberOfInteractionsForLikes =
    numberOfInteractions + (canIcrement ? 1 : 0) - (canDecrement ? 1 : 0);

  return (
    <div className="post-body-actions-item">
      <Button type="actions" onClick={handleClick}>
        <Icon
          color={showHeart && isLikeButton ? 'var(--color-pink-medium)' : 'var(--color-black)'}
        />
      </Button>
      {numberOfInteractions !== undefined && (
        <span className="post-body-actions-interactions">
          {isLikeButton ? numberOfInteractionsForLikes : numberOfInteractions}
        </span>
      )}
    </div>
  );
}

export default ActionItem;
