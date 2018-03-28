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

const imgSize = {
  objectFit: 'contain'
}

const failStyle = {
  flexDirection: 'column'
}

class Game extends Component {
  constructor (props) {
    super(props);
    this.state = {
      level: props.level
    }
  }

  componentDidMount () {
    this.props.setLevel(this.state.level);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.match.params.id !== nextProps.match.params.id){
      this.setState({
        level: nextProps.level
      })
    }
  }

  render() {
    console.log("here's our current level", this.state.level)
    if (this.props.gameType === 'blockly') {
      return (
        <div style={style}>
          <Sandbox level={this.state.level.toString()} matchId={this.props.match.params.id}/>
            <Blocks level={this.props.match.params.id}/>
        </div>
      )
    } else if (this.props.gameType === 'text') {
      return (
        <div style={{...style, "maxHeight": "512px" }}>
          <div style={shadow}>
            <Sandbox level={this.state.level.toString()} matchId={this.props.match.params.id}/>
          </div>
            <Editor level={this.props.match.params.id}/>
        </div>
      )
    } else {
      return (
        <div style={style}>
          <div style={failStyle}>
          <img style={imgSize} alt="You're in the wrong place!" src={bigWitch} />
          <h1>This place is cursed, go back!</h1>
          <Link to ="/">
            <RaisedButton
              label="Fly Home"
              primary={true}
            />
          </Link>
          </div>
        </div>
      )
    }
  }
}

const mapState = (state) => {
  return {
    gameType: state.gameType,
    level: state.userDetail
  //level pointer position probably here
  }
}

const mapDispatch = (dispatch) => {
  return {
    setLevel: (level) => dispatch(dispatchWitchLevel(level))
  }
}


export default connect(mapState, mapDispatch)(Game);
