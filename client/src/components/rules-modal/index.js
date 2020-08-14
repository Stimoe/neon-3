import React from "react";

import "./style.css";

const RulesModal = (props) => {
  return (
    <div>
      <div
        className="modal-wrapper"
        style={{
          transform: props.show ? "translateY(0vh)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        <div className="modal-header">
          <h1>How to Play</h1>
        </div>
        <div className="modal-body">
          <p className="modal-body-text">
            Click on up to 2 cards to add them to center, can click again to
            bring back to hand. After choosing 2 cards for your turn, click End
            Turn.
          </p>
          <button className="btn-continue" onClick={props.close}>
            CONTINUE
          </button>
        </div>
        {/* <span className="close-modal-btn" onClick={props.close}>
          ×
        </span> */}
        {/* <div className="modal-footer">
          <button className="btn-continue" onClick={props.close}>
            CONTINUE
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default RulesModal;
