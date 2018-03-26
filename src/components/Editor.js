/* eslint no-loop-func: 0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/tomorrow'

import { dispatchTextChange, dispatchChangeWitchX, dispatchChangeWitchY, dispatchWitchReset, dispatchInterpretCode } from '../store'

import isValidMove from '../scripts/isValidMove'
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

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
    }
    this.handleRun = this.handleRun.bind(this)
  }

  handleRun(){
    // Gets text editor commands and parses them.
    this.props.resetWitch();
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
          let stopSign = false;
          for(let i = 1; i <= result.length; i++){
            setTimeout(function () {
              switch(result[i-1]){
                case "right":
                  console.log("we here")
                  if (isValidMove(this.state, this.props, result[i - 1])) {
                    this.props.onAction("X", 50);
                  } else {
                    console.log('no gurl')
                  }
                  break;
                case "left":
                  if (!stopSign && isValidMove(this.state, this.props, result[i - 1])) {
                    this.props.onAction("X", -50);
                  } else {
                    console.log('no gurl')
                  }
                  break;
                case "up":
                  if (!stopSign && isValidMove(this.state, this.props, result[i - 1])) {
                    this.props.onAction("Y", -50);
                  } else {
                    console.log('no gurl')
                  }
                  break;
                case "down":
                  if (!stopSign && isValidMove(this.state, this.props, result[i - 1])) {
                    this.props.onAction("Y", 50);
                  } else {
                    console.log('no gurl')
                  }
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
            }.bind(this), (300*i))
          }
        }
      })


  //   actions = actions.split('\n');
  //   // Resets the witch to the start.
  //   this.props.resetWitch();
  //   this.setState({annotations: [], markers: [], bag: "empty"})
  //   //console.log(actions)
  //   let stopSign = false;

  //   // let i = 1;
  //   // while(i <= actions.length){
  //   //   (function (i) {
  //     for(let i = 1; i <= actions.length; i++){
  //       setTimeout(function () {
  //         switch (actions[i - 1]) {
  //           case "witch.moveRight();":
  //             if (!stopSign && isValidMove(this.state, this.props, actions[i - 1])) {
  //               this.props.onAction("X", 50);
  //             } else {
  //               console.log('no gurl')
  //             }
  //             break;
  //           case "witch.moveLeft();":
  //             if (!stopSign && isValidMove(this.state, this.props, actions[i - 1])) {
  //               this.props.onAction("X", -50)
  //             } else {
  //               console.log('no gurl')
  //             }
  //             break;
  //           case "witch.moveDown();":
  //             if (!stopSign && isValidMove(this.state, this.props, actions[i - 1])) {
  //               this.props.onAction("Y", 50)
  //             } else {
  //               console.log('no gurl')
  //             }
  //             break;
  //           case "witch.moveUp();":
  //             if (!stopSign && isValidMove(this.state, this.props, actions[i - 1])) {
  //               this.props.onAction("Y", -50)
  //             } else {
  //               console.log('no gurl')
  //             }
  //             break;
  //           case "witch.pickUp();":
  //             this.setState({bag: "full"})
  //             break;
  //           case "if (witch.bag === \"empty\") {":
  //             try {
  //               let code = actions.slice(i - 1)
  //               let end = code.indexOf("}")
  //               code = code.join("\n");
  //               i += end;
  //               console.log(end, i)
  //               // Checks if the rest of the code you have is valid at all.
  //               console.log(acorn.parse(code))

  //               // We're going to skip over all lines inside of the if statement and then run it.
  //               if(code.includes("witch.pickUp();")){
  //                 this.setState({bag: "full"})
  //               }
  //             } catch (error) {
  //               console.log(error);
  //               // If your code is broken, stop running.
  //               stopSign = true;
  //               break;
  //             }
  //             break;
  //           case "":
  //             break;
  //           default:
  //             stopSign = true;
  //             //console.log("Wrong Syntax, probably");
  //             break;
  //          }
  //         // i++;
  //       }.bind(this), (300 * i))
  //   }



  // setTimeout(
  //   () => {
  //     if (this.props.witchX >= this.state.endX - 105 && this.props.witchY >= this.state.endY - 105 ) {
  //     alert('Winner winner chicken dinner!')
  //     }

  //     let j = 1;
  //     while (j <= actions.length) {
  //       switch (actions[j - 1]) {
  //         case "witch.moveRight();":
  //         case "witch.moveLeft();":
  //         case "witch.moveDown();":
  //         case "witch.moveUp();":
  //         case "witch.pickUp();":
  //         case "":
  //           break;
  //         case "if (witch.bag === \"empty\") {":
  //           try {
  //             let code = actions.slice(j - 1)
  //             let end = code.indexOf("}")
  //             code = code.join("\n");
  //             j += end;
  //             // Checks if the rest of the code you have is valid at all.
  //             console.log(acorn.parse(code))
  //             // We're going to skip over all lines inside of the if statement and then run it.
  //           } catch (error) {
  //             console.log(error);
  //             break;
  //           }
  //           break;
  //         default:
  //           this.setState({
  //             annotations: [...this.state.annotations, {
  //               row: (j - 1),
  //               text: 'Syntax Error at Line ' + (j) + '. ' + actions[j - 1] + " is not a function.",
  //               type: 'error'
  //             }],
  //             markers: [...this.state.markers, {
  //               startRow: (j - 1),
  //               endRow: j,
  //               className: 'error-marker',
  //               type: 'background'
  //             }]
  //           })
  //           break;
  //       }
  //       j++;
  //     }


  //   }, 300*(actions.length) + 15)

  //   console.log(this.state.bag);
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
        <p>
          <RaisedButton
          label="Run Code"
          secondary={true}
          style={style}
          onClick={this.handleRun}/>
        </p>
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
    output: state.codeRunner
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
    },
    dispatchCode(code) {
      return dispatch(dispatchInterpretCode(code))
    }
  }
}

export default connect(mapState, mapDispatch)(Editor);
