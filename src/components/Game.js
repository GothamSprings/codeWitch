import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Sandbox, Editor} from './'
import Blocks from './blocks/Blocks'

const GREY = "#9E9E9E";

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  margin: 'auto',
  paddingTop: 50,
};


const shadow = {
  boxShadow: `0px 0px 25px 10px ${GREY}`
};

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
          <div style={shadow}>
            <Sandbox level={this.props.match.params.id}/>
            <Editor level={this.props.match.params.id}/>
          </div>
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
