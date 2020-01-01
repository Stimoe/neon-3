import React, { Component } from "react";
import {Link} from "react-router-dom"
import "./style.css";

class Storypage extends Component {
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
              <h1 className="neon3 head">Neon Rain</h1>
            </div>
            <br></br>
            <div className=" neon26 nes">
              

              <p> The year is 2116 and the the United Nations of Governments are on the brink of war with Coalition of Corporations. The Gaberial virus has shattered the loosely held peace and both parties are desperately looking for the cure as they believe it will give them the winning hand when the conflict begins.</p>

              <br></br>
            <p>Rumor on the street is that Dr. C Wheetman has found a cure but is going to hand it off to an unknown organization that believes the cure should be free for everyone</p>
            <br></br>
              <p>Thomas S. your loremaster has been given the mission to deliver the code for the cure but you’ve been betrayed by the Jonas Clan, both the Corporations and the Governments now know who you are and that you have the code. They have sent their top assets to retrieve it from you!
              </p>
        
            </div>   
               <br></br>
            <Link to="/battlepage">
          <button type="button" className="btn mb-3 neon1 nes-pointer nes-btn">
            Start your Journey
          </button>
          </Link>
          </div>
      </div>
    );
  }
}

export default Storypage;
