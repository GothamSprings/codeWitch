import React, { Component } from 'react'
import { connect } from 'react-redux'
import Editor from './Editor'

class Game extends Component {

  render() {
    return (
      <div>
        <Editor />
        <button>RUN</button>
      </div>
    )
  }
}

export default Game;
