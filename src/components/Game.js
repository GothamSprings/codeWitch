import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Sandbox, Editor} from './'
import Blocks from './blocks/Blocks'


class Game extends Component {

  constructor (props) {
    super(props);
    
  }

  componentDidMount () {
    this.setState({
      type: this.state
    })
  }

  render() {
    console.log('Props in game ', this.props);
    console.log('')
    if (this.props.gameType === 'blockly') {
      return (
        <div>
          <Sandbox />
          <Blocks />
        </div>
      )
    } else if (this.props.gameType === 'text') {
      return (
        <div>
          <Sandbox />
          <Editor />
        </div>
      )
    } else {
      return (
        <h1>You should not be here, please go back and pick a game type.</h1>
      )
    }
  }
}

const mapState = (state) => {
  return {
    gameType: state.gameType
  //level pointer position probably here
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}


export default connect(mapState, mapDispatch)(Game);
