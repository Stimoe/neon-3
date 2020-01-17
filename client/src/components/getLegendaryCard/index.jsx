import React, { Component } from "react";
import Cards from "../cards";
import style from "./style.css";
import legendaryCards from "../../legendaryCards.json";
var UserInitialDeck = require("../../cards.json");

class LegendaryBrain extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    legendaryCards: [],
    newCards: [],
    tempHand: [],
    randomLegendary: [],
    legendaryChosen: false,
    newDrawnCards: [],
    drawArea: [],
    turnEnded: false,
    finalLegendaryCard: [],
    currentDeck: UserInitialDeck, //make this an or statement
    deckBuilt: false
  };

  componentDidMount() {
    const newLegendaryCards = this.shuffleCards(legendaryCards);

    this.setState(
      {
        legendaryCards: newLegendaryCards
      },
      this.getLegendary
    );
  }

  // drawNewCards = () => {
  //   let tempDeck = [...this.state.newCards];
  //   const tempDraw = [];
  //   const shuffledDeck = [...this.shuffleCards(tempDeck)];

  //   while (tempDraw.length < 3) {

  //     let tempCard = shuffledDeck.shift();
  //     tempDraw.push(tempCard);
  //   }
  //   this.setState({
  //     newDrawnCards: tempDraw
  //   });
  // };

  getLegendary = () => {
    let tempDeck = [...this.state.legendaryCards];
    const tempDraw = [];
    const shuffledDeck = [...this.shuffleCards(tempDeck)];
    while (tempDraw.length < 1) {
      let tempCard = shuffledDeck.shift();
      tempDraw.push(tempCard);
      this.setState({
        randomLegendary: tempDraw
      });
    }
  };

  legendaryToDeck = card => {
    let randomCard = card;
    let tempDeck = this.state.finalLegendaryCard;
    tempDeck.push(randomCard);
    this.setState({
      finalLegendaryCard: tempDeck,
      legendaryChosen: true
    });
  };

  toDraw = index => {
    // console.log(this.state.hand);

    let card = this.state.randomLegendary[index];

    let tempNewDeck = this.state.finalLegendaryCard;
    tempNewDeck.push(card);

    this.setState(
      {
        finalLegendaryCard: tempNewDeck,
        legendaryChosen: true
      },
      this.getLegendary
    );
    if (this.state.finalLegendaryCard.length === 1) {
      let currentNewDeck = this.state.finalLegendaryCard;
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
