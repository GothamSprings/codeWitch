import React, { Component } from 'react';
import '../css/App.css';
import Sandbox from './Sandbox';
import Editor from './Editor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Stuff goes here.</h1>
        <Editor />
        {/*<Sandbox />*/}
      </div>
    );
  }
}

export default App;
