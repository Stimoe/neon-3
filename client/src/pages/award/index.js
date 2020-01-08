import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import DrawBrain from "../../components/drawCards";
import { Redirect } from 'react-router-dom';
// import { booleanLiteral } from "@babel/types";

var UserInitialDeck = require("../../cards.json");


class Save extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      username: "",
      userDeck: UserInitialDeck,

      deckDrawn: false
    };
  }

  componentDidMount() {

    let currentUser = this.props.location.state.username
    
 
    
    this.setState({
      username: currentUser,
 
    }, () => {
      // this.getCurrentWinCount()
      //testing this function
      
    })
// console.log(this.state.username)
  }






  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    // console.log(this.userDeck);
  };

  handleOnClick = e => {

  }


 




drawn = (p) => {
 let deck=this.refs.child.newDeck;
  console.log(deck);
  
  
  if(p){
    this.setState({
      deckDrawn:true
    })
  }
}

renderRedirect = () => {
  if (this.state.redirect) {
    return <Redirect to={{
     pathname: '/battlepage',
     state: { 
       username: this.state.username,
      userDeck: this.state.userDeck
      }
 }}
 />
  }
}






  render() {
    if (this.state.deckDrawn) {
      return (
        <div>
          <div className="landing6"></div>
          <div className="d-flex carddeck justify-content-center">
            {this.state.userTurnOver ? "true" : "false"}
            <br></br>

            <br></br>
          </div>

          <div className="caption text-center nes-pointer">
            <Link to="/">
              <button
                type="button"
                className="btn nes-pointer neon1 mb-3 nes-btn"
                onClick={this.handleOnClick}>
              >
                Save &amp; Quit
              </button>
            </Link>
            <Link to="/battlepage">
              <button
                type="button"
                className="btn mb-3 neon1 nes-pointer nes-btn"
                onClick={this.handleOnClick}>
                Save &amp; Continue
                
              </button>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="landing6"></div>
          <div className="awardCards">
        <DrawBrain ref="child"
       
        newDeck={this.state.finalNewCards}
        readPlayed={this.handlePlayedCards}
      
        
        drawn={this.drawn}
        />
        </div>
        </div>

        );
    }
  }
}

export default Save;


