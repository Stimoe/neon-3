import React, { Component } from "react";
import Cards from "../cards";
import newCardsFromJson from "../../newCards.json";
import legendaryCards from "../../legendaryCards.json"
var UserInitialDeck = require("../../cards.json");

class DrawBrain extends Component {
  constructor(props) {
    super(props);

  }
  state = {
    legendaryCards : [],
    newCards: [],
    tempHand: [],
    randomLegendary: [],
    legendaryChosen: false,
    newDrawnCards: [],
    drawArea: [],
    turnEnded: false,
    finalNewCards: [],
    currentDeck: UserInitialDeck, //make this an or statement
    deckBuilt: false
  };

  componentDidMount() {
    const newLegendaryCards = this.shuffleCards(legendaryCards)
    const newCardsShuffled = this.shuffleCards(newCardsFromJson);
  

    this.setState(
      {
        newCards: newCardsShuffled,
        legendaryCards: newLegendaryCards
      },
      this.drawNewCards
    );
  }

  // componentDidMount() {
  //   const newLegendaryCards = this.shuffleCards(legendaryCards)
  //   const newCardsShuffled = this.shuffleCards(newCardsFromJson);
  

  //   this.setState(
  //     {
  //       newCards: newCardsShuffled,
  //       legendaryCards: newLegendaryCards
  //     },
  //     this.getLegendary
  //   );
  // }


  drawNewCards = () => {
    let tempDeck = [...this.state.newCards];
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

  // getLegendary = () => {
  //   let tempDeck = [...this.state.legendaryCards];
  //   const tempDraw = [];
  //   let tempCard = tempDeck.shift();
  //   tempDraw.push(tempCard)
  //   this.setState({
  //     randomLegendary: tempDraw
  //   }, () =>{
  //     this.drawNewCards()
  //   })
  // }

//   legendaryToDeck = (card) => {
// let randomCard = card
// let tempDeck = this.state.finalNewCards;
// tempDeck.push(randomCard)
// this.setState({
//   finalNewCards: tempDeck,
//   legendaryChosen: true
// })
//   }




 

  toDraw = index => {
    // console.log(this.state.hand);

    let card = this.state.newDrawnCards[index];

    let tempNewDeck = this.state.finalNewCards;
    tempNewDeck.push(card);

    this.setState(
      {
        finalNewCards: tempNewDeck
      },
      this.drawNewCards
    );
    if (this.state.finalNewCards.length === 4) {

      let currentNewDeck = this.state.finalNewCards;
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
    // if (!legendaryChosen){
    //   let randomLegendary = this.state.randomLegendary.map((card, index) => {
    //     return (
    //       <div className="handCard row d-flex justify-content-center">
    //         <Cards
    //           name={card.name}
    //           image={card.image}
    //           text={card.text}
    //           handleClick={this.legendaryToDeck}
    //           currentIndex={index}
    //         />
    //       </div>
    //     );
    //   });
    // }
    // else {
    let newDrawnCards = this.state.newDrawnCards.map((card, index) => {
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

        <div className="handArea">
          {newDrawnCards.length ? newDrawnCards : null}
        </div>
      </div>
      // </div>
    );
  }
}

export default DrawBrain;
