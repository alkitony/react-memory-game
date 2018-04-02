import React, { Component } from 'react';
import './Card.css';
import PropTypes from 'prop-types';

class Card extends Component {
  static propTypes = {
      id: PropTypes.string.isRequired,
      onFlipCard: PropTypes.func.isRequired,
      card: PropTypes.object.isRequired
      // ,
      // matched: PropTypes.objectOf(PropTypes.bool).isRequired,
      // cardFlip: PropTypes.objectOf(PropTypes.bool).isRequired,
      // background: PropTypes.objectOf(PropTypes.string).isRequired.isRequired
  }
	
  render () {
    // console.log(this.props);
  	const {id, onFlipCard} = this.props;
  	const {background, matched, cardFlip} = this.props.card;
  	let backgroundColor;
  	if (matched || cardFlip) {
  	  backgroundColor = background;
  	}
    return (
      <button 
        className="Card"
        onClick={() => (matched || cardFlip) ? null : onFlipCard(id)}
        style={{backgroundColor}}
      >
      </button>
    );
  }
	
}


export default Card;