import React, { Component } from 'react';
import Blocks from './blocks/Blocks'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="gameContainer">
          <Blocks />
        </div>
      </div>
    );
  }
}

export default App;
