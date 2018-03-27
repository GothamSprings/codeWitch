import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Sandbox, Editor} from './'
import Blocks from './blocks/Blocks'
import { dispatchWitchLevel } from '../store'


const style = {
  display: 'flex',
  justifyContent: 'center',
  margin: 'auto',
  paddingTop: 75
}

class Game extends Component {
  constructor (props) {
    super(props);
    this.state = {
      level: this.props.match.params.id
    }
  }

  componentDidMount () {
    this.props.setLevel(this.state.level)
  }

  render() {
    if (this.props.gameType === 'blockly') {
      return (
        <div style={style}>
          <Sandbox level={this.props.match.params.id}/>
          <Blocks level={this.props.match.params.id}/>
        </div>
      )
    } else if (this.props.gameType === 'text') {
      return (
        <div style={style}>
          <Sandbox level={this.props.match.params.id}/>
          <Editor level={this.props.match.params.id}/>
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
    setLevel: (level) => dispatch(dispatchWitchLevel(level))
  }
}


export default connect(mapState, mapDispatch)(Game);
