/* eslint no-loop-func: 0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/tomorrow'

import { dispatchTextChange, dispatchChangeWitchX, dispatchChangeWitchY, dispatchWitchReset } from '../store'

import isValidMove from '../scripts/isValidMove'

class Editor extends Component {
  constructor(props){
    super(props)
    console.log(props);
    this.state = {
      annotations: [],
      markers: [],
      stageHeight: 500,
      stageWidth: 500,
      endX: 300,
      endY: 300,
      witchX: props.witchX,
      witchY: props.witchY,
      wallX: 400,
      wallY: 50
    }
    this.handleRun = this.handleRun.bind(this)
  }

  handleRun(){
    let actionCoordArr = [];

    // Gets text editor commands and parses them.
    let actions = this.props.textValue;
    actions = actions.split('\n');

    // Resets the witch to the start.
    this.props.resetWitch();

    let stopSign = false;

    for(let i = 1; i <= actions.length; i++){
      setTimeout(function () {
        switch(actions[i-1]){
          case "witch.moveRight();":
            if(!stopSign && isValidMove(this.state, this.props, actions[i-1])){
              this.props.onAction("X", 50);
            } else {
              console.log('no gurl')
            }
            break;
          case "witch.moveLeft();":
            if (!stopSign && isValidMove(this.state, this.props, actions[i-1])) {
              this.props.onAction("X", -50)
            } else {
              console.log('no gurl')
            }
            break;
          case "witch.moveDown();":
            if (!stopSign && isValidMove(this.state, this.props, actions[i-1])) {
              this.props.onAction("Y", 50)
            } else {
              console.log('no gurl')
            }
            break;
          case "witch.moveUp();":
            if (!stopSign && isValidMove(this.state, this.props, actions[i-1])) {
              this.props.onAction("Y", -50)
            } else {
              console.log('no gurl')
            }
            break;
          case "":
            break;
          default:
            stopSign = true;
            this.setState({
              annotations: [...this.state.annotations, {
                row: (i - 1),
                text: 'Syntax Error at Line ' + (i) + '. ' + actions[i-1] + " is not a function.",
                type: 'error'
              } ],
              markers: [...this.state.markers, {
                startRow: (i-1),
                endRow: i,
                className: 'error-marker',
                type: 'background'
              }]
            })
            console.log("Wrong Syntax, probably");
            break;
        }
      }.bind(this), (500 * i))

      let currentCoord = {
        witchX: this.props.witchX,
        witchY: this.props.witchY
      }
      actionCoordArr.push(currentCoord);
    }
    console.log(actionCoordArr);

    setTimeout(
      () => {if (this.props.witchX >= this.state.endX - 105 && this.props.witchY >= this.state.endY - 105 ) {
        alert('Winner winner chicken dinner!')
        }
      }, 500*(actions.length) + 15)
  }

  render(){
    return (
      <div>
        <AceEditor
          mode="javascript"
          theme="tomorrow"
          onChange={this.props.onChange}
          name="editor"
          editorProps={{ $blockScrolling: true }}
          height="300px"
          width="300px"
          focus={true}
          annotations={this.state.annotations}
          markers={this.state.markers}
          wrapEnabled={true}
          value={this.props.textValue}
        />
        <button value={this.props.textValue} onClick={this.handleRun}>Run</button>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    textValue: state.editorValue,
    witchCoords: state.witchCoords,
    witchX: state.witchCoords.witchX,
    witchY: state.witchCoords.witchY
  }
}

const mapDispatch = (dispatch) => {
  return {
    onChange(textValue) {
      dispatch(dispatchTextChange(textValue));
    },
    onAction(direction, units){
      if(direction === "Y"){
        dispatch(dispatchChangeWitchY(units));
      } else if (direction ==="X"){
        dispatch(dispatchChangeWitchX(units));
      }
    },
    resetWitch(){
      dispatch(dispatchWitchReset());
    }
  }
}

export default connect(mapState, mapDispatch)(Editor);
