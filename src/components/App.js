import React, { Component } from 'react';
import '../css/App.css';
import Sandbox from './Sandbox';
import Game from './Game';
import Board from './Board';
import Blocks from './blocks/Blocks'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Stuff goes here.</h1>
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
