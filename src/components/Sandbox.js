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
      color: 'green',
      witchX: props.witchX,
      witchY: props.witchY,
      endX: 300,
      endY: 300,
      stageHeight: 300,
      stageWidth: 300,
    };
    // this.onClick = this.onClick.bind(this);
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

  // onClick(evt) {
  //   evt.preventDefault();

  //   if (this.state.input === 'right') {
  //     dispatchChangeWitchX(20);

      // if (this.state.witchX > this.state.stageWidth-25) {
      //   //add a 'bounce' behavior here?
      // } else if (this.state.witchX < this.state.stageWidth-25) {
      //   this.setState({
      //     witchX: this.state.witchX + 10
      //   })
      // }
    // }
    // if (this.state.input === 'left') {
    //   if (this.state.witchX < 0) {
    //     //add a 'bounce' behavior here?
    //   } else if (this.state.witchX > 0) {
    //     this.setState({
    //       witchX: this.state.witchX - 10
    //     })
    //   }
    // }
    // if (this.state.input === 'down') {
    //   if (this.state.witchY > this.state.stageHeight-40) {
    //     //add a bounce statement here
    //   } else if (this.state.witchY < this.state.stageHeight-40) {
    //     this.setState({
    //       witchY: this.state.witchY + 10
    //     })
    //   }
    // }
    // if (this.state.input === 'up') {
    //   if (this.state.witchY < 0) {
    //     //add a bounce statement here
    //   } else if (this.state.witchY > 0) {
    //     this.setState({
    //       witchY: this.state.witchY - 10
    //     })
    //   }
    // }
    // if (this.state.witchX >= this.state.endX - 25 && this.state.witchY >= this.state.endY - 45 ) {
    //   alert('Winner winner chicken dinner!')
    //   this.setState({
    //     witchX: 20,
    //     witchY: 20
    //   });
    // }

    // console.log('witch x is: ', this.state.witchX, 'witch y is: ', this.state.witchY);
    // console.log(this.state.stageHeight, this.state.stageWidth)
    // console.log(this.state.endX, this.state.endY)
  // }

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
            <Stage width={window.innerWidth/2} height={window.innerHeight-100}>
              <Layer>
                <Witch y={this.props.witchY} x={this.props.witchX} color={this.state.color}/>
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
      // if(this.state.input)
      console.log('movin')
      dispatch(dispatchChangeWitchX(10))
      dispatch(dispatchChangeWitchY(10))
    }
  }
}

export default connect(mapState, mapDispatch)(Sandbox);
