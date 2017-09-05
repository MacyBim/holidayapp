import * as React from 'react';
import './header.css';

// const logo = require('./pineapple.svg');

class Header extends React.Component {

  render() {
    return (
      <div className="bgimage">
        <div className="header-text">
            <h1>Vakantiedagen</h1>
        </div>
      </div>  
    );
  }
}

export default Header;