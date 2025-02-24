import './Input.css';

const Input = ({ type, placeholder, onChange, onKeyDown, defaultValue }) => {
    return (
        <input
            className='input'
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
            defaultValue={defaultValue}
        />
    );
};

export default Input;
