import React, { Component } from 'react';
import '../css/App.css';
import Sandbox from './Sandbox';
import Blocks from './blocks/Blocks';
import Game from './Game';
import Board from './Board';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="gameContainer">
          <Sandbox />
          <Blocks />
          <Game />
          <Board />
        </div>
      </div>
    );
  }
}

export default App;
