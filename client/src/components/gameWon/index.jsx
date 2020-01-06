import React from "react";
import { Link } from "react-router-dom";


function GameWon() {
  return (
    <div>

        <h1>You Won!!!</h1>

        <Link to="/">
          <button type="button" className="btn mb-3 neon1 nes-pointer nes-btn">
            Start over
          </button>
          </Link>
    </div>
   
  );
}

export default GameWon;