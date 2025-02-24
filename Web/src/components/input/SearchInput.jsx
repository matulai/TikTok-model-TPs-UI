import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { SearchIcon } from '../icons/SearchIcon'
import Input from './Input'
import './SearchInput.css'

const SearchInput = ({onSearch}) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const onClick = () => {
    if (searchValue) {
      navigate(`/search/${searchValue}`);
      onSearch(searchValue);
    }
  }

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  }

  return (
    <div className="search-container">
        <Input
          type="text"
          placeholder="Buscar"
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => onEnter(e)}
        />
      <div onClick={onClick} className="search-icon-container">
        <SearchIcon color='var(--color-grey-dark)' />
      </div>
    </div>
  );
};

export default SearchInput;
