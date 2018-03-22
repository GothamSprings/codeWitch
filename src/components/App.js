import React, { Component } from 'react';
import '../css/App.css';
import { Game, Board, Navbar, Directions, WorldStage } from './'
import Blocks from './blocks/Blocks';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <WorldStage />
        <div className="gameContainer">
          <Blocks />
          <Game />
          {/* <Board /> */}
          <Directions />
          {/* <Hints /> */}
        </div>
      </div>
    );
  }
}

export default App;
