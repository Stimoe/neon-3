import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./style.css";
import DrawBrain from "../../components/drawCards";
import { booleanLiteral } from "@babel/types";
import { Redirect } from "react-router-dom";
var UserInitialDeck = require("../../cards.json");


class Save extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      // userDeck: UserInitialDeck,
      winCount: 0,
      deckDrawn: false
    };
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    // console.log(this.userDeck);
  };

  handleOnClick = e => {

    Axios.post("/gamestate", this.userDeck).then(data => {
            console.log(data);
            this.props.history.push("/battlepage")
            // .then( Axios.put(`/api/Users/${id}`, body) )
          }).catch (err=> {
            console.log(err);    
          })
  }

drawn = (p) => {
  if(p){
    this.setState({
      deckDrawn:true
    })
  }
}

renderRedirect = () => {
  if (this.state.redirect) {
    return <Redirect to='/battlepage' />
  }
}

// onSubmit = e => {
//     e.preventDefault();

// const userDeck = {
//       username: this.state.username,
//       userDeck: this.state.userDeck,
//       winCount: this.state.winCount
//     };
//     Axios.post("/gamestate", userDeck).then(data => {
//       console.log(data);
//       this.props.history.push("/battlepage")
//     }).catch (err=> {
//       console.log(err);    
//     })
// console.log(userDeck);
//   };


// render() {
//     if(this.state.deckDrawn){
//     return (
      
//       <div></div>
//       <div className="d-flex carddeck justify-content-center" >
          
//           {this.state.userTurnOver ? "true" : "false"}
//           <br></br>

//           <br></br>
        
//         </div>


  // drawn = p => {
  //   if (p) {
  //     this.setState({
  //       deckDrawn: true
  //     });
  //   }
  // };

  // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     return <Redirect to="/battlepage" />;
  //   }
  // };

  // onSubmit = e => {
  //     e.preventDefault();

  // const userDeck = {
  //       username: this.state.username,
  //       userDeck: this.state.userDeck,
  //       winCount: this.state.winCount
  //     };
  //     Axios.post("/gamestate", userDeck).then(data => {
  //       console.log(data);
  //       this.props.history.push("/battlepage")
  //     }).catch (err=> {
  //       console.log(err);
  //     })
  // console.log(userDeck);
  //   };

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
        <DrawBrain
        readPlayed={this.handlePlayedCards}
        // currentDeck={this.userDeck}
        drawn={this.drawn}
        />
        </div>
        </div>

        );
    }
  }
}

export default Save;
