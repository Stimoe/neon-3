import React from "react";
import { Link } from "react-router-dom";


function GameOver() {
  return (
    <div>

        <h1>Game over!!!</h1>

        <Link to="/">
          <button type="button" className="btn mb-3 neon1 nes-pointer nes-btn">
            Start over
          </button>
          </Link>
    </div>
   
  );
}

export default GameOver;