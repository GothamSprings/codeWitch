import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Stage, Layer } from 'react-konva';

import { WorldMap, LevelPointer } from './'

import { dispatchGameType } from '../store'

class WorldStage extends Component {

  render () {
    return(
      <div>
        <Stage width={1280} height={640} >
          <Layer>
            <WorldMap />
            <LevelPointer />
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
  //level pointer position probably here
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick(evt, type) {
      evt.preventDefault();
      dispatch(dispatchGameType(type))
    }
  }
}

export default connect(mapState, mapDispatch)(WorldStage);
