import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Stage, Layer } from 'react-konva';

import { WorldMap, LevelPointer } from './'

import { dispatchGameType } from '../store'

class WorldStage extends Component {

  render () {
    console.log('level on world stage', this.props.userDetail)
    return(
      <div>
        <Stage width={1280} height={640} >
          <Layer>
            <WorldMap />
            <LevelPointer
              gameType={this.props.gameType}
              userDetail={this.props.userDetail} />
          </Layer>
        </Stage>
        <div>
          <button onClick={(evt) => this.props.handleClick(evt, 'blockly')}>Blockly</button>
          <button onClick={(evt) => this.props.handleClick(evt, 'text')}>Text Editor</button>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    gameType: state.gameType,
    userDetail: state.userDetail
  //level pointer position probably here
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick(evt, type) {
      evt.preventDefault();
      gameTypeChosenAlert(`You chose to play with ${type}. Now choose the game level.`, 1500);
      dispatch(dispatchGameType(type))
    }
  }
}

function gameTypeChosenAlert(msg,duration) {
  var el = document.createElement("div");
  el.setAttribute("style", "position: absolute; bottom: 10%; left: 30%; background-color: white;");
  el.innerHTML = msg;
  setTimeout(function(){
    el.parentNode.removeChild(el);
    },duration);
  document.body.appendChild(el);
}

export default connect(mapState, mapDispatch)(WorldStage);
