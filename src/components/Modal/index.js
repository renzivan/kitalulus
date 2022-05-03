import { Button, Modal as BModal} from 'react-bootstrap';

const Modal = ({ description, show, onClick }) => {
  return (
    <BModal
    show={show}
    onHide={() => onClick()}
    >
      <BModal.Header closeButton>
        <BModal.Title>Description</BModal.Title>
      </BModal.Header>
      <BModal.Body>
        {description}
      </BModal.Body>
      <BModal.Footer>
        <Button variant="secondary" onClick={() => onClick()}>
          Close
        </Button>
      </BModal.Footer>
    </BModal>
  )
}

export default Modal;
