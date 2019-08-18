import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MainModal = ({ show, toggleModal, category, action }) => {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3 style={{ fontWeight: '900' }}>Confirmation required</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>You are about to delete all past {category}</h4>
        <p>If this is what you intend to do please click the confirm button.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => {
            action(category);
            toggleModal(false);
          }}
        >
          Confirm
        </Button>
        <Button variant="danger" onClick={() => toggleModal(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MainModal;
