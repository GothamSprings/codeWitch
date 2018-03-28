import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Sandbox, Editor} from './'
import Blocks from './blocks/Blocks'
import { dispatchWitchLevel } from '../store'
import bigWitch from '../assets/bigWitch.png';
import { RaisedButton } from 'material-ui';
import {Link} from 'react-router-dom'

const GREY = "#9E9E9E";

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  margin: 'auto',
  paddingTop: 100,
};

const shadow = {
  display: 'flex',
  boxShadow: `0px 0px 25px 10px ${GREY}`
};

class Game extends Component {
  constructor (props) {
    super(props);
    this.state = {
      level: this.props.match.params.id
    }
  }

  componentDidMount () {
    this.props.setLevel(this.state.level);
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
        <div style={{...style, "max-height": "512px" }}>
          <div style={shadow}>
            <Sandbox level={this.props.match.params.id}/>
          </div>
            <Editor level={this.props.match.params.id}/>
        </div>
      )
    } else {
      return (
        <div style={style}>
          <img alt="You're in the wrong place!" src={bigWitch} />
          <Link to ="/">
            <RaisedButton
              label="Fly Home"
              primary={true}
            />
          </Link>
        </div>
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
