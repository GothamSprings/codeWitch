import React, { Component } from 'react';
import Iframe from 'react-iframe';
import Frame from 'react-sandbox-frame'
import { render } from 'react-dom';
import { Stage, Layer, Circle, Text } from 'react-konva';
import Konva from 'konva';
import KonvaCanvas from './KonvaCanvas';

class ColoredCirc extends React.Component {
  state = {
    color: 'green'
  };
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };
  render() {
    return (
      <Circle
        x={20}
        y={20}
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
      color: 'green'
    };
    this.onClick.bind(this);
    this.onSubmit.bind(this);
  }


  onLoad (document) {
    // console.log(document) // output <p>hello world</p>
  }

  onClick(evt) {
    evt.preventDefault();
    this.setState({
      color: Konva.Util.getRandomColor()

    });
  }

  onSubmit(evt) {
    evt.preventDefault();
    console.log(evt);
    // this.setState({
      // color: Konva.Util.getRandomColor()
    // });
  }

  render() {
    // console.log(Konva);
    return (
      <div>
        <div>
          <Stage width={window.innerWidth-100} height={window.innerHeight-100}>
            <Layer>
              <ColoredCirc color={this.state.color}/>
            </Layer>
          </Stage>
        </div>
        <div>
          <form>
            <input></input>
            <button onClick={this.onClick.bind(this)}>BE A BUTTON</button>
          </form>
        </div>
      </div>
      // </Frame>
    )
  }
}

export default Sandbox;
