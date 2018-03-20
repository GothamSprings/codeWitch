import React, { Component } from 'react'
import { connect } from 'react-redux'

import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/tomorrow'

import { dispatchTextChange } from '../store'

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
      witchX: 20,
      witchY: 20
    }

    let actions = this.props.textValue;
    actions = actions.split('\n');

    for(let i = 0; i < actions.length; i++){
      switch(actions[i]){
        case "witch.moveRight();":
          testCoords.witchX += 10;
          break;
        case "witch.moveLeft();":
          testCoords.witchX -= 10;
          break;
        case "witch.moveDown();":
          testCoords.witchY += 10;
          break;
        case "witch.moveUp();":
          testCoords.witchY -= 10;
          break;
        default:
          console.log("Wrong Syntax, probably");
          break;
      }
      let currentCoord = {
        witchX: testCoords.witchX,
        witchY: testCoords.witchY
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
    textValue: state.editorValue
  }
}

const mapDispatch = (dispatch) => {
  return {
    onChange(textValue) {
      dispatch(dispatchTextChange(textValue));
    }
  }
}

export default connect(mapState, mapDispatch)(Editor);
