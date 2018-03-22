import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Stage, Layer } from 'react-konva';

import { WorldMap, LevelPointer } from './'

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
  }
}

export default connect(mapState, mapDispatch)(WorldStage);