import React, { Component } from 'react';
import './Card.css';
import PropTypes from 'prop-types';

class Card extends Component {
  static propTypes = {
      id: PropTypes.number.isRequired,
      matched: PropTypes.bool.isRequired,
      visable: PropTypes.bool.isRequired,
      background: PropTypes.string.isRequired,
      onFlipCard: PropTypes.func.isRequired
  }
	
  render () {
  	const {id, matched, visable, background, onFlipCard} = this.props;
  	const backgroundColor = (matched || visable) ? background : "gray"

    return (
      <button 
        className="Card"
        onClick={() => (!matched && !visable) ? onFlipCard(id) : null}
        style={{backgroundColor}}
      >
      </button>
    )
  }
	
}


export default Card;