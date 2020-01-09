import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import DrawBrain from "../../components/drawCards";
import { Redirect } from 'react-router-dom';
// import { booleanLiteral } from "@babel/types";




class Save extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      username: "",
      userDeck: [],
      winCount: 0,
      deckDrawn: false
    };
  }

  componentDidMount() {
    let currentWinCount = this.props.location.state.winCount
    let currentUser = this.props.location.state.username
    this.setState({
      username: currentUser,
      winCount: currentWinCount
    }, () => {
this.getCurrentDeck()
    })

  }






  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    // console.log(this.userDeck);
  };

  handleOnClick = e => {
    this.setState({
      redirect: true
    })
  }

  getCurrentDeck = () => {
    let user = this.state.username
    axios.get('/api/user/currentUser', {
      params: {
        username: user
      }
    })
      .then(res => {
        console.log(res.data)
        let newUserDeck=res.data.userDeck

        console.log(newUserDeck);        
        this.setState({
          userDeck: newUserDeck,
        })
      })

  }

  addCardsToServer = () => {
    axios.patch('/api/user/newDeck', { username: this.state.username, userDeck: this.state.userDeck }).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err.response);
      console.log("Username already exists or password could not be validated")
    })
  }
  drawn = (newDrawnCards) => {

    let currentDeck = this.state.userDeck
    for (let i = 0; i < newDrawnCards.length; i++) {
      currentDeck.push(newDrawnCards[i])

    }
    console.log(currentDeck);
    this.addCardsToServer()

    if (newDrawnCards) {
      this.setState({
        deckDrawn: true
      })
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/battlepage',
        state: {
          username: this.state.username,
          userDeck: this.state.userDeck,
          winCount: this.state.winCount
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
            <DrawBrain

              newDeck2={this.state.finalNewCards}
              readPlayed={this.handlePlayedCards}

              updateDeck={this.newDeck}
              drawn={this.drawn}
            />
          </div>
        </div>

      );
    }
  }
}

export default Save;


