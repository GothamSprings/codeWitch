import React, { Component } from 'react';
import '../css/App.css';
import Sandbox from './Sandbox';
import Game from './Game'
import Board from './Board'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Stuff goes here.</h1>
        <div className="gameContainer">
          <Sandbox />
          <Game />
          <Board />
        </div>
      </div>
    );
  }
}

export default App;
