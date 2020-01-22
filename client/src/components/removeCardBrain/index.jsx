import React, { Component } from "react";

import style from "./style.css";
import legendaryCards from "../../legendaryCards.json";
var UserInitialDeck = require("../../cards.json");

class LegendaryBrain extends Component {
  constructor(props) {
    super(props);
  }
  state = {
currentDeck: [],
    newCards: [],
    tempHand: [],
newDeckAfterRemove: [],

    newDrawnCards: [],
    drawArea: [],
    turnEnded: false,

    currentDeck: UserInitialDeck, //make this an or statement
    deckBuilt: false
  };

  componentDidMount() {
    let newUserDeck = this.props.currentDeck;
    

    this.setState(
      {
        currentDeck: newUserDeck
      },
      this.getLegendary
    );
  }

  getThreeCards = () => {
    let tempDeck = [...this.state.currentDeck];
    const tempDraw = [];
    const shuffledDeck = [...this.shuffleCards(tempDeck)];

    while (tempDraw.length < 3) {

      let tempCard = shuffledDeck.shift();
      tempDraw.push(tempCard);
    }
    this.setState({
      newDrawnCards: tempDraw
    });
  };





  toDraw = index => {
    let card = this.state.newDrawnCards[index];
    let cardName=card.name
let userCurrentDeck=this.state.currentDeck
    for (let i = 0; i < userCurrentDeck.length; i++) {
      
      
    }
    let tempNewDeck = this.state.newDeckAfterRemove;
    tempNewDeck.push(card);
    this.setState(
      {
        newDeckAfterRemove: tempNewDeck
      },

    );
    if (this.state.newDeckAfterRemove.length === 1) {

      
      this.props.drawn(currentNewDeck);
    }
  };

  //   sendData = () => {
  //     this.props.parentCallback(this.state.finalNewCards);
  // }

  shuffleCards = cards => {
    let randomCardsArray = [];
    let originalCards = cards.slice(0);

    while (originalCards.length) {
      let randomNumber = Math.floor(Math.random() * originalCards.length);
      let card = originalCards.splice(randomNumber, 1)[0];
      randomCardsArray.push(card);
    }
    return randomCardsArray;
  };

  render() {
    const { legendaryChosen } = this.state;

    let randomLegendary = this.state.randomLegendary.map((card, index) => {
      return (
        <div className="handCard row d-flex justify-content-center">
          <Cards
            name={card.name}
            image={card.image}
            text={card.text}
            handleClick={this.toDraw}
            currentIndex={index}
          />
        </div>
      );
    });

    return (
      // <div className="nes-container decks is-rounded">
      <div id="gameArea">
        <div className="row d-flex justify-content-center"></div>

        <div className="handArea legend">
          {randomLegendary.length ? randomLegendary : null}
        </div>
      </div>
      // </div>
    );
  }
}

export default LegendaryBrain;
