import React, { useState, Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class EnemyActionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: props.initialModalState
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
         <Button color="danger" onClick={this.toggle}>TOGGLE</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Enemy action</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EnemyActionModal;