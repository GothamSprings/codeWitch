import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Sandbox, Editor} from './'

class Game extends Component {

  render() {
    return (
      <div>
        <Sandbox />
        <Editor />
      </div>
    )
  }
}

export default Game;
