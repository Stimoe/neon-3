import React, { Component } from "react";
import "./style.css";

class Leaderboards extends Component {
  render() {
    return (
      <div>
        <div className="landing1">
          <div className="home-wrap1">
            <div className="home-inner1"></div>
          </div>
        </div>
          <div className="container">
            <div>
              <h1 className="neon3 head"></h1>
            </div>
            <br></br>
            <div className=" neon2 nes">
              
              <h1> </h1>
              <br></br>
            <p>Choose the 2 cards you want to play but be careful of play order, each card will move into the play area, the left most card will trigger first</p>
            <br></br>
              <p>Once you have chosen both cards, click the end turn button, but beware after your done with your turn the enemy will go</p>
              <br></br>
              <p>After you defeat your enemy, you will get the option to add 3 new cards to your deck! Choose Wisely as these new cards will help you defeat your next enemy should you choose to continue!!!</p>
            </div>
          </div>
      </div>
    );
  }
}

export default Leaderboards;
