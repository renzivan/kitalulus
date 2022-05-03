import './table.scss';

const Modal = ({ description, onClick }) => {
  const handleClickClose = () => {
    onClick()
  }

  return (
    <div>
      {description}
      <button onClick={handleClickClose}>close</button>
    </div>
  )
}

export default Modal;
