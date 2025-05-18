import { Modal } from "react-bootstrap";

function ModalImage({ show, onClose, image, alt }) {
  return (
    <Modal show={show} onHide={onClose} dialogClassName="fullscreen-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title>{alt}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <img
          src={image}
          alt={alt}
          className="modal-image"
        />
      </Modal.Body>
    </Modal>
  );
}

export default ModalImage;


