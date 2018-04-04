import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Menu.css';

class Menu extends Component {
   static defaultProps = 
     {
      appTitle: 'Memory Game',
      menuItems: ['New Game'],
      onNewGame() {}
     }
    
   static propTypes = 
     {
      appTitle: PropTypes.string.isRequired,
      menuItems: PropTypes.arrayOf(PropTypes.string).isRequired,
      onNewGame: PropTypes.func.isRequired
     } 
     
   render() {
      const {appTitle, onNewGame} = this.props;
      const menuItems = this.props.menuItems.map((menuItem, index) => (
         <li key={index}
            onClick={menuItem === 'New Game' ? onNewGame : null}
         >
      <button>{menuItem}</button></li>     
   ));
       
      return (
          <nav className='navBar'>
            <div> 
            <h1>{appTitle}</h1>
             </div>
             <div>
                <ul>
                  {menuItems}
                </ul>
             </div>
           </nav>
       );
    }
}
 
export default Menu