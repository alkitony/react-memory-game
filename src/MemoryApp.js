import React, { Component } from 'react';
import './MemoryApp.css';
import Menu from './Menu.js';
import Card from './Card';

// Number of cards must be an even number
// const NUM_OF_CARDS = 20;

// This must have an even number of unique colors. It must be half the number of cards
const COLORS = ["Blue",     "Brown", "Green",   "Cornsilk",     "Crimson",
                "LightPink","Orange","SkyBlue", "MediumPurple", "DarkGoldenRod"];

const CardsLayout = (props) => {
  const cardFunArray = () => {
    const keys = Object.keys(props.cards);
    const cardsArray = [];
    for(let i = 0; i < keys.length; i++) {
      cardsArray.push(<Card onFlipCard={props.onFlipCard} 
                            key={keys[i]}
                            id={keys[i]} 
                            card={props.cards[keys[i]]}
                      />);
    }
    return cardsArray;
  };
  const style = {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '10px auto',
    maxWidth: '600px'
  };
  return (
    <div style={style}>
        {cardFunArray()}        
    </div>
  );
};

class MemoryApp extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cards: this.createColorCards(),
      previousCardFlip: "",
      unMatchedCards: []
    };
    this.onFlipCard = this.onFlipCard.bind(this);
    this.onNewGame = this.onNewGame.bind(this);
  }

  randomizeArray(arr) {
    // shuffle the incomming array
    const randomItemsArr = Array(arr.length).fill();
    const randomItemIdx = arr.map((val,idx) => idx);
    let randomIdx;
    for (let i = 0; i < (arr.length); i++){
      randomIdx = Math.floor(Math.random() * randomItemIdx.length);
      randomItemsArr.splice(randomItemIdx[randomIdx],1,arr[i]);
      randomItemIdx.splice(randomIdx,1);
    }
    return randomItemsArr;
  }

  createColorCards() {
    
    // Randomize the color array
    const randomColors = this.randomizeArray(COLORS.concat(COLORS));
    
    // create key value pair object of color cards
    let colorCards = {};
    for (let i = 0; i < (randomColors.length); i++){
      colorCards[`${randomColors[i]}-${i}`] = {background: randomColors[i], matched: false, cardFlip: false};
    }
    return colorCards;
  }
  
  onFlipCard(id) {
    
    // Make a copy of state and deconstruct certain objects
    const newState = JSON.parse(JSON.stringify(this.state));
    const {cards, previousCardFlip} = this.state;

    // Check if a previous card been fliped
    if (previousCardFlip === "") {

      // No previously fliped card. save card
      newState.previousCardFlip = id;
      newState.cards[id].cardFlip = true;
      
    } else {
      
      // Check if the color is the of the previously flip card 
      if (cards[id].background === cards[previousCardFlip].background) {

        // cards do match. Set values to true and remove previously fliped card
        newState.cards[id].matched = true;
        newState.cards[previousCardFlip].matched = true;
        newState.previousCardFlip = "";

      } else {
        
        // cards to not match. Add cards to unmatched array and initialize timeout function.
        newState.cards[id].cardFlip = true;
        newState.unMatchedCards.push([id, previousCardFlip]);
        newState.previousCardFlip = "";
        setTimeout(() => {

          // Check if array has anything to flip back. Player may have clicked new game.
          if (this.state.unMatchedCards.length > 0) {
            const newState = JSON.parse(JSON.stringify(this.state));
            const {unMatchedCards} = this.state;
            newState.cards[unMatchedCards[0][0]].cardFlip = false;
            newState.cards[unMatchedCards[0][1]].cardFlip = false;
            newState.unMatchedCards.splice(0,1);
            this.setState(newState);
          }
        }, 2000);
      }
    }

    // render new content
    this.setState(newState);
  }

  onNewGame() {
    // reset everything in the game.
    const newState = {
      cards: this.createColorCards(),
      previousCardFlip: "",
      unMatchedCards: []
    };
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <Menu onNewGame={this.onNewGame} />
        <CardsLayout 
           cards={this.state.cards}
           onFlipCard={this.onFlipCard}
        />
      </div>
    );
  }
}

export default MemoryApp;
