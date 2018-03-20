import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Stage, Layer, Rect } from 'react-konva';
import Konva from 'konva';

import { Witch, EndPoint } from './'
import { dispatchChangeWitchX, dispatchChangeWitchY } from '../store'


class Sandbox extends Component {

  constructor (props) {
    super(props);
    this.state = {
      input: '',
      witchX: props.witchX,
      witchY: props.witchY,
      endX: 300,
      endY: 300,
      stageHeight: 500,
      stageWidth: 500,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.witchX !== this.props.witchX) {
    }
    if (prevProps.witchY !== this.props.witchY) {
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      witchX: nextProps.witchX,
      witchY: nextProps.witchY
    })
  }

  onLoad (document) {
  }

  onSubmit(evt) {
    evt.preventDefault();
    this.setState({
      witchX: 20,
      witchY: 20
    });
  }

  onChange = evt => {
    this.setState({input: evt.target.value});
  };

  render() {
    console.log(this.state.witchX, this.state.witchY)
    console.log(this.props.witchX, this.props.witchY)

    const divStyle = {
      margin: '40px',
      border: '5px solid pink'
    };

    return (
      <div>
          <div style={divStyle}>
            <Stage width={this.state.stageWidth} height={this.state.stageHeight}>
              <Layer>
                <Witch y={this.props.witchY} x={this.props.witchX} />
              </Layer>
              <Layer>
                <EndPoint y={this.state.endY} x={this.state.endX} />
              </Layer>
            </Stage>
          </div>
        <div>
          <form >
            <input onChange={this.onChange}></input>
            <button onClick={this.props.onClick}>BE A BUTTON</button>
            <button type="submit">RESET</button>
          </form>
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
    onClick(evt) {
      evt.preventDefault();
      console.log('movin')
      // if (isValidMove(currentState, currentCommand)) {
      //   dispatch(currentCommand())
      // }
      // else {
      //   //sad noises
      // }
    }
  }
}

export default connect(mapState, mapDispatch)(Sandbox);
