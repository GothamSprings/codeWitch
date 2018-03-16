import React, { Component } from 'react';
import '../css/App.css';
import Sandbox from './Sandbox';
import Editor from './Editor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Stuff goes here.</h1>
        {/* Move below content into a Game component.*/}
        <div className="gameContainer">
          <Sandbox />
          <div>
            <Editor />
            <button>RUN</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
