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
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this)
  }

  onLoad (document) {
  }

  onSubmit(evt) {
    evt.preventDefault();
    // evt.stopPropagation();
    this.setState({
      witchX: 20,
      witchY: 20
    });
  }

  onClick(evt) {
    // alert('going');
    evt.preventDefault();
    if (this.state.input === 'right') {
      if (this.state.witchX > this.state.stageWidth-25) {
        //add a 'bounce' behavior here?
      } else if (this.state.witchX < this.state.stageWidth-25) {
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
      if (this.state.witchY > this.state.stageHeight-40) {
        //add a bounce statement here
      } else if (this.state.witchY < this.state.stageHeight-40) {
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
    if (this.state.witchX >= this.state.endX - 25 && this.state.witchY >= this.state.endY - 45 ) {
      alert('Winner winner chicken dinner!')
      this.setState({
        witchX: 20,
        witchY: 20
      });
    }

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
          <div style={divStyle}>
            <Stage width={window.innerWidth/2} height={window.innerHeight-100}>
              <Layer>
                <Witch y={this.state.witchY} x={this.state.witchX} color={this.state.color}/>
              </Layer>
              <Layer>
                <Rect width={50} height={50} y={this.state.endY} x={this.state.endX} fill={'red'} />
              </Layer>
            </Stage>
          </div>
        <div>
          <form onSubmit={this.onSubmit}>
            <input onChange={this.onChange}></input>
            <button onClick={this.onClick}>BE A BUTTON</button>
            <button type="submit">RESET</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Sandbox;
