import React from "react";
import card from "../../cards.json";
import "./style.css";

function Cards(props) {
  return (
    <div
      onClick={() => {
        props.handleClick(props.currentIndex);
      }}
      id="player-card"
      className={`card grow raise col-md-${props.colSize}`}
    >
      <div className="card-body flip-card-inner nes-pointer">
        <div class="flip-card-front">
        </div>
        <div class="flip-card-back">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.text}</p>
        </div>
      </div>
    </div>
  );
}

export default Cards;
