import React, { Component } from 'react';
import '../css/App.css';
import { Game, Board, Navbar, Directions, WorldStage , Routes} from './'
import Blocks from './blocks/Blocks';
import {Switch ,Route, withRouter} from 'react-router-dom';
import connect from 'react-redux'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Routes />
      </div>
    );
  }
}
// const mapState = (state)=>{}
// const mapDispatch =()=>{}


export default App;
