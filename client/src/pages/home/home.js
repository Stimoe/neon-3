import React, { Component } from "react";
import {Link} from "react-router-dom"
import "./style.css";




class Home extends Component {
  state = {
    username: "",
    password: "",
    loggedInUser:"",
    show: false,
    url:"https://stimoe.github.io/expressNeonRainServer",
    // url:"http://localhost:8080",
  };


  render() {

    return (
      
      <div>
        <div className="landing">
          <div className="home-wrap">
            <div className="home-inner"></div>
          </div>
        </div>

        <div className="caption text-center nes-pointer">
          <Link to="/register">
          <button type="button" className="btn nes-pointer neon1 mb-3 nes-btn">
            Start New
            </button>
          </Link>
          <Link to="/login">
          <button type="button" className="btn nes-pointer neon1 mb-3 nes-btn">
            Resume  
          </button>
          </Link>
          <Link to="/rules">
          <button type="button" className="btn mb-3 neon1 nes-pointer nes-btn">
            Rules
          </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
