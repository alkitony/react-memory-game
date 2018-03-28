import React, { Component } from 'react';
import './MemoryApp.css';
import Menu from './Menu.js';
import Card from './Card';

const NUM_OF_CARDS = 20;
const COLORS = ["Blue",     "Brown", "Green",   "Cornsilk",     "Crimson",
                "LightPink","Orange","SkyBlue", "MediumPurple", "DarkGoldenRod"];

const CardsLayout = (props) => {
    console.log(props);
    const card = props.cards.map((c) => (
      <Card onFlipCard={props.onFlipCard} key={c.id} {...c} />
    )) ;
    console.log(card)
    const style = {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '10px auto',
      maxWidth: '600px'
    }
    return (
      <div style={style}>
          {card}        
      </div>
    );
};

class MemoryApp extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cards: this.layoutColorCard()
    };
    this.onFlipCard = this.onFlipCard.bind(this);
    this.onNewGame = this.onNewGame.bind(this);
  }

  layoutColorCard() {
    const colorCards = Array(NUM_OF_CARDS).fill();
    const colorCardIdx = colorCards.map((val,idx) => idx);
    let randomCardIdx;
    let cardColor;
    for (let i = 0; i < (COLORS.length); i++){
       cardColor = COLORS[i];
       randomCardIdx = Math.floor(Math.random() * colorCardIdx.length);
       colorCards.splice(colorCardIdx[randomCardIdx],1,
          { id: i,
            matched: false,
            visable: false,
            background: cardColor
          }
       );
       colorCardIdx.splice(randomCardIdx,1);
       randomCardIdx = Math.floor(Math.random() * colorCardIdx.length);
       colorCards.splice(colorCardIdx[randomCardIdx],1,
          { id: COLORS.length + i,
            matched: false,
            visable: false,
            background: cardColor
          }
       );
       colorCardIdx.splice(randomCardIdx,1);
    }
    return colorCards;
  }
  
  onFlipCard(id) {
    const cards = this.state.cards.map((c) => c);
    const flipCardIdx = cards.findIndex((c) => (c.id === id));
    const faceUpCardIdx = cards.findIndex((c) => (c.visable));
    if (faceUpCardIdx !== -1) {
      
      if (cards[flipCardIdx].background === cards[faceUpCardIdx].background) {
        cards[flipCardIdx].matched=true;
        cards[faceUpCardIdx].matched=true;
        cards[faceUpCardIdx].visable=false;
      } else {
        cards[flipCardIdx].visable=true;
        setTimeout(() => {
          const cards = this.state.cards.slice();
          for (let i=0; i < cards.length; i++) {
            if (cards[i].visable) {
              cards[i].visable=false;
            }
          }
          this.setState({cards});
        }, 1500);
      }

    } else {
      cards[flipCardIdx].visable=true;
    }
    this.setState({cards});
  }
  
  onNewGame() {
    const cards = this.layoutColorCard()
    this.setState({cards});
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
