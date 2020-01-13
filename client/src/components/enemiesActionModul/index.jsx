import React, { useState, Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';





function EnemyModal(props) {
    const [smShow, setSmShow] = useState(false);

  
    return (
      <ButtonToolbar>
        <Button onClick={() => setSmShow(true)}>Small modal</Button>
 
  
        <Modal
          size="sm"
          show={smShow}
          onHide={() => setSmShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
            Enemy Action
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>...</Modal.Body>
        </Modal>
  
  
      </ButtonToolbar>
    );
  }
  
  export default EnemyModal;

