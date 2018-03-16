import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Circle, Text } from 'react-konva';
import Konva from 'konva';
import KonvaCanvas from './KonvaCanvas';

class ColoredCirc extends React.Component {

  render() {
    return (
      <Circle
        x={this.props.x}
        y={this.props.y}
        width={50}
        height={50}
        fill={this.props.color}
        shadowBlur={5}
        onClick={this.handleClick}
      />
    );
  }
}

class Sandbox extends Component {

  constructor (props) {
    super(props);
    this.state = {
      input: '',
      color: 'green',
      x: 20,
      y: 20
    };
    this.onClick.bind(this);
  }

  onLoad (document) {
  }

  onClick(evt) {
    evt.preventDefault();
    if (this.state.input === 'right') {
      this.setState({
        x: this.state.x + 10
      })
    }
    if (this.state.input === 'down') {
      this.setState({
        y: this.state.y + 10
      })
    }
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  }

  onChange = evt => {
    // this.setState({ color: evt.target.value });
    this.setState({input: evt.target.value});
  };

  render() {
    return (
      <div>
        <div>
          <Stage width={window.innerWidth/2} height={window.innerHeight- 100}>
            <Layer>
              <ColoredCirc y={this.state.y} x={this.state.x} color={this.state.color}/>
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
