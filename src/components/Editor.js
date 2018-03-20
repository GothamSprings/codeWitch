import React, { Component } from 'react'
import { connect } from 'react-redux'

import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/tomorrow'

import { dispatchTextChange, dispatchChangeWitchX, dispatchChangeWitchY } from '../store'

class Editor extends Component {
  constructor(props){
    super(props)
    console.log(props);
    this.state = {
      textVal: "hey",
      coords: []
    }
    this.handleRun = this.handleRun.bind(this)
  }

  handleRun(){
    let actionCoordArr = [];
    // Pull down game state from props.
    let testCoords = {
      witchX: this.props.witchX,
      witchY: this.props.witchY
    }

    let actions = this.props.textValue;
    actions = actions.split('\n');
    console.log(actions)
    for(let i = 1; i <= actions.length; i++){
      switch(actions[i-1]){
        case "witch.moveRight();":
          //this.props.onAction("X", 50)
           setTimeout(function(){
             this.props.onAction("X", 50)
           }.bind(this), (500*i))
          break;
        case "witch.moveLeft();":
          this.props.onAction("X", -50)
          break;
        case "witch.moveDown();":
          this.props.onAction("Y", 50)
          break;
        case "witch.moveUp();":
          this.props.onAction("Y", -50)
          break;
        default:
          console.log("Wrong Syntax, probably");
          break;
      }


      let currentCoord = {
        witchX: this.props.witchX,
        witchY: this.props.witchY
      }
      actionCoordArr.push(currentCoord);
    }
    console.log(actionCoordArr);
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
        dispatch(dispatchChangeWitchY(units))
      } else if (direction ==="X"){
        dispatch(dispatchChangeWitchX(units))
      }
    }
  }
}

export default connect(mapState, mapDispatch)(Editor);
