import * as React from 'react';

import './style.css';
import Header from './Header/header';
import Main from './Main/main';

class App extends React.Component {

  render() {
    return (
      <div className="app">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
