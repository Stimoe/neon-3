import React from 'react';


import ModalWrapper from '../modalWrapper/modalWrapper'
const EnemyAction = props => {
  const enemyAction = provider => {
    props.hideModal();
    props.enemyAction(provider);
  };

  return (
    <ModalWrapper
      {...props}
      title="Enemy Action"
      width={400}
      showOk={false}
    >
      <p>Choose your flavor</p>

    </ModalWrapper>
  );
};

export default EnemyAction;