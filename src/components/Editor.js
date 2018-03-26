/* eslint no-loop-func: 0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/tomorrow'

import { dispatchTextChange, dispatchWitchReset, dispatchInterpretCode, dispatchWitchPickUpItem, dispatchWitchCastSpell, dispatchWitchMoveDown, dispatchWitchMoveLeft, dispatchWitchMoveRight, dispatchWitchMoveUp } from '../store'

import isValidMove from '../scripts/isValidMove'

class Editor extends Component {
  constructor(props){
    super(props)
    // console.log(props);
    this.state = {
      annotations: [],
      markers: [],
      stageHeight: 500,
      stageWidth: 500,
      endX: 300,
      endY: 300,
      witchX: props.witchX,
      witchY: props.witchY,
      bag: "empty",
      wallX: 400,
      wallY: 50,
      hitWall: false
    }
    this.handleRun = this.handleRun.bind(this)
  }

  handleRun(){
    // Gets text editor commands and parses them.
    this.props.resetWitch();
    this.setState({annotations: [], markers: []})
    let actions = this.props.textValue;
    this.props.dispatchCode(actions)
      .then(() => {
        let result = this.props.output
        if (typeof result === "string") {
          let lineNum = result.match(/\d+/)[0]
          this.setState({
          annotations: [...this.state.annotations, {
                row: lineNum - 1,
                text: result,
                type: 'error'
              }],
              markers: [...this.state.markers, {
                startRow: lineNum - 1,
                endRow: lineNum,
                className: 'error-marker',
                type: 'background'
              }]
          })
        } else {
            for (let i = 1; i <= result.length; i++) {
              setTimeout(function () {
                try {
                switch (result[i - 1]) {
                  case "right":
                    this.props.moveRight();
                    break;
                  case "left":
                    this.props.moveLeft();
                    break;
                  case "up":
                    this.props.moveUp();
                    break;
                  case "down":
                    this.props.moveDown();
                    break;
                  case "pickup":
                    console.log("Pick Up Something")
                    break;
                  case "castspell":
                    console.log("Cast a spell")
                    break;
                  default:
                    console.log("You should not be here?")
                    break;
                }
                } catch (e) {
                  this.setState({hitWall: true})
                  console.error(e)
                }
              }.bind(this), (300 * i))
            }

          setTimeout(function () {
            console.log(this.props.atEnd)
            if (this.props.atEnd) {
              console.log("You did it!")
            }
          }.bind(this), ((actions.length - 1) * 300 + 15))
        }
      })
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
        <h2>bag:{this.state.bag}</h2>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    textValue: state.editorValue,
    witchCoords: state.witchCoords,
    witchX: state.witchCoords.witchX,
    witchY: state.witchCoords.witchY,
    nearOgre: state.witchCoords.near_an_ogre,
    atEnd: state.witchCoords.at_end_point,
    bag: state.witchCoords.witchBag,
    output: state.codeRunner
  }
}

const mapDispatch = (dispatch) => {
  return {
    onChange(textValue) {
      dispatch(dispatchTextChange(textValue));
    },
    moveUp: () => dispatch(dispatchWitchMoveUp()),
    moveDown: () => dispatch(dispatchWitchMoveDown()),
    moveLeft: () => dispatch(dispatchWitchMoveLeft()),
    moveRight: () => dispatch(dispatchWitchMoveRight()),
    resetWitch(){
      dispatch(dispatchWitchReset());
    },
    dispatchCode(code) {
      return dispatch(dispatchInterpretCode(code))
    },
    pickUp: () => dispatch(dispatchWitchPickUpItem("key")),
    castSpell: () => dispatch(dispatchWitchCastSpell("Gothmog"))
  }
}

export default connect(mapState, mapDispatch)(Editor);
