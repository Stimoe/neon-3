import React, { useState, Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';





class EnemyActionModal extends Component {

  constructor(props) {
    super(props);

    this.addWorkLog = this.addWorkLog.bind(this);       
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.state = {
         open:true

       };
  }

onOpenModal() {
 this.setState({open: this.props.openModal});
}

onCloseModal() {
 this.setState({open:false});
}

addWorkLog() {

}



render() {
  const bstyle = {
     backgroundColor: 'green',
     textAlign:"left",
     paddingLeft: '0px',
     color: 'white'
};
const {open} = this.state;
   return (
       <div>
            <Modal
                size="sm"
                aria-labelledby="example-modal-sizes-title-sm"

            open={open} onClose={this.onCloseModal} little>
            <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Small Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
        </div>
   );
}
}
  
  export default  EnemyActionModal;

