import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Sandbox, Editor} from './'
import  Blocks from './blocks/Blocks'


class Game extends Component {

  constructor (props) {
    super(props);
    // state = {
    //   type: this.props.type
    // }
  }

  componentDidMount () {
    this.setState({
      type: this.state
    })
  }

  render() {
    console.log('State in game ', this.props);
    return (
      <div>
        <Sandbox />
        <Editor />
        <Blocks />
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    type: state.type
  //level pointer position probably here
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}


export default connect(mapState, mapDispatch)(Game);
