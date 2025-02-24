import './Modal.css';

const Modal = ({message, setModalMessage}) => {
  const closeModal = () => {
    setModalMessage('');
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
