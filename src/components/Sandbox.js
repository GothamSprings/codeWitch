import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Stage, Layer } from 'react-konva';
// import Konva from 'konva';

import { Background, Witch, EndPoint } from './'
// import { dispatchChangeWitchX, dispatchChangeWitchY } from '../store'


class Sandbox extends Component {

  constructor (props) {
    super(props);
    this.state = {
      input: '',
      witchX: props.witchX,
      witchY: props.witchY,
      endX: 450,
      endY: 450,
      stageHeight: 512,
      stageWidth: 512,
    };
  }

  //witch position updates here
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      witchX: nextProps.witchX,
      witchY: nextProps.witchY
    })
  }

  // onLoad (document) {
  // }


  render() {

    const divStyle = {
      // margin: '40px',
      // border: '5px solid pink'
    };

    console.log("This should equal 1", this.props.level);
    console.log("this.props is: ", this.props);

    return (
      <div>
          <div style={divStyle}>
            <Stage width={this.state.stageWidth} height={this.state.stageHeight}>
              <Layer>
                <Background level={this.props.level}/>
              </Layer>
              <Layer>
                <EndPoint y={this.state.endY} x={this.state.endX} />
                <Witch y={this.props.witchY} x={this.props.witchX} />
              </Layer>
            </Stage>
          </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    witchX: state.witchCoords.witchX,
    witchY: state.witchCoords.witchY,
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default connect(mapState, mapDispatch)(Sandbox);
