import React, { Component } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import Konva from 'konva';
import Witch from './Witch.js'

class Sandbox extends Component {

  constructor (props) {
    super(props);
    this.state = {
      input: '',
      color: 'green',
      witchX: 20,
      witchY: 20,
      endX: 300,
      endY: 300,
      stageHeight: 300,
      stageWidth: 300,
    };
    this.onClick.bind(this);
  }

  onLoad (document) {
  }

  onClick(evt) {
    evt.preventDefault();
    if (this.state.input === 'right') {
      if (this.state.witchX > this.state.stageWidth-50) {
        //add a 'bounce' behavior here?
      } else if (this.state.witchX < this.state.stageWidth-50) {
        this.setState({
          witchX: this.state.witchX + 10
        })
      }
    }
    if (this.state.input === 'left') {
      if (this.state.witchX < 0) {
        // this.setState({
        //   witchX: this.state.witchX + 5
        // })
        // window.setTimeout(function(){ console.log('waiting') }, 1000);
        // this.setState({
        //   witchX: this.state.witchX - 5
        // })
        //add a 'bounce' behavior here?
      } else if (this.state.witchX > 0) {
        this.setState({
          witchX: this.state.witchX - 10
        })
      }
    }
    if (this.state.input === 'down') {
      if (this.state.witchY > this.state.stageHeight-70) {
        //add a bounce statement here
      } else if (this.state.witchY < this.state.stageHeight-70) {
        this.setState({
          witchY: this.state.witchY + 10
        })
      }
    }
    if (this.state.input === 'up') {
      if (this.state.witchY < 0) {
        //add a bounce statement here
      } else if (this.state.witchY > 0) {
        this.setState({
          witchY: this.state.witchY - 10
        })
      }
    }
    this.setState({
      color: Konva.Util.getRandomColor()
    });
    // console.log('witch x is: ', this.state.witchX, 'witch y is: ', this.state.witchY);
    // console.log(this.state.stageHeight, this.state.stageWidth)
    // console.log(this.state.endX, this.state.endY)
  }

  onChange = evt => {
    this.setState({input: evt.target.value});
  };

  render() {
    const divStyle = {
      margin: '40px',
      border: '5px solid pink'
    };

    return (
      <div>
        <div>
          <Stage width={window.innerWidth/2} height={window.innerHeight-100}>
        // <div style={divStyle}>
          // <Stage width={this.state.stageWidth} height={this.state.stageHeight}>
            <Layer>
              <Witch y={this.state.witchY} x={this.state.witchX} color={this.state.color}/>
            </Layer>
            <Layer>
              <Rect width={50} height={50} y={this.state.endY} x={this.state.endX} fill={'red'} />
            </Layer>
          </Stage>
        </div>
        <div>
          <form>
            <input onChange={this.onChange.bind(this)}></input>
            <button onClick={this.onClick.bind(this)}>BE A BUTTON</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Sandbox;
