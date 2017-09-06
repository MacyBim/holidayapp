import * as React from 'react';

import './style.css';
import Header from './Header/header';
import Main from './Main/main';

class App extends React.Component {

  render() {
    // let name = (this.state.medewerkers[0]) &&
    // this.state.medewerkers[0].naam;
    return (
      <div className="app">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;