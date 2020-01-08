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
    let newUserDeck = this.props.location.state.finalNewCards
    console.log("New User Deck ",newUserDeck);
    
    this.setState({
      username: currentUser,
      userDeck: newUserDeck
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


    // Axios.post("/gamestate", this.userDeck).then(data => {
    //         console.log(data);
    //         this.props.history.push("/battlepage")
    //         // .then( Axios.put(`/api/Users/${id}`, body) )
    //       }).catch (err=> {
    //         console.log(err);    
    //       })
  }

  // updateWinCount = () => {
  //   axios.patch('/api/user/winCount', { username: this.state.username, winCount: this.state.winCount }).then(res => {
  //     console.log("line 26 ", res.data, res.status)

  //   }).catch(err => {
  //     console.log(err.response);
  //     console.log("Username already exists or password could not be validated")
  //     this.setState({
  //       redirect: true,
  //     })


  //   })
  // }

 




drawn = (p) => {
  console.log(this.state.userDeck);
  console.log(p);
  
  
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
