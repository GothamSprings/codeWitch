/* eslint no-loop-func: 0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import history from '../history';

import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/tomorrow'

import { dispatchTextChange, dispatchWitchReset, dispatchInterpretCode, dispatchWitchPickUpItem, dispatchWitchCastSpell, dispatchWitchMoveDown, dispatchWitchMoveLeft, dispatchWitchMoveRight, dispatchWitchMoveUp, dispatchUserLevel, dispatchTextClearValue, dispatchWitchLevel } from '../store'

import { FlatButton, RaisedButton } from 'material-ui';
import { Directions } from './'

const style = {
  margin: 12,
};

class Editor extends Component {
  constructor(props){
    super(props)
    // console.log(props);
    this.state = {
      error: [],
      annotations: [],
      markers: [],
      witchX: props.witchX,
      witchY: props.witchY,
      open: true,
      next: false
    }
    this.handleRun = this.handleRun.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    //this.goNextLevel =this.goNextLevel.bind(this)
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false});
  }

  goNextLevel = (evt, level) => {
    this.props.goNext(level)
    history.push({
      pathname: `/level/${level}`,
      state: { type: this.props.gameType }
    })
    this.props.setLevelMap(level);
    this.setState({
      error: [],
      annotations: [],
      markers: [],
      open: true,
      next: false
    })
  }

  handleRun(){
    // Gets text editor commands and parses them.
    this.props.resetWitch();
    this.setState({annotations: [], markers: [], error: []})
    let actions = this.props.textValue;
    this.props.dispatchCode(actions)
  }

  componentWillReceiveProps(nextProps){
    if(this.props.output !== nextProps.output){
        let result = nextProps.output
        if (typeof result === "string" && result) {
          if(result.includes("TimeoutError") || result.includes("SyntaxError")){
            console.log(result)
          } else if(result.includes("TypeError")){
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
          }
        } else {
              let step = setInterval(function () {
                try {
                  if (result.length) {
                    switch (result.shift()) {
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
                        this.props.pickUp()
                        break;
                      case "castspell":
                        this.props.castSpell()
                        break;
                      default:
                        console.log("You should not be here?")
                        break;
                    }
                  } else if(!result.length && this.props.atEnd){
                    clearInterval(step)
                    console.log("you made it!")
                    if(!this.state.next){
                      this.setState({ next: true })
                    }
                    this.props.setLevel(+this.props.match.params.id + 1);
                  }
                } catch (e) {
                  clearInterval(step)
                  this.setState({
                    error: [...this.state.error, e]
                  })
                  alert(e, typeof(e))
                }
              }.bind(this), 100)
      }
    }
  }

  render(){
    const GREY = "#9E9E9E";

    const shadow = {
      display: 'flex',
      boxShadow: `0px 0px 25px 10px ${GREY}`
    };

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Okay"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];
    console.log("Errors", this.state.error)
    return (
      <div>
        <div style={ shadow }>
          <AceEditor
            mode="javascript"
            theme="tomorrow"
            onChange={this.props.onChange}
            name="editor"
            editorProps={{ $blockScrolling: true }}
            height="512px"
            width="512px"
            focus={true}
            annotations={this.state.annotations}
            markers={this.state.markers}
            wrapEnabled={true}
            value={this.props.textValue}
          />
        </div>

        <RaisedButton
        label="Run Code"
        secondary={true}
        style={style}
        onClick={this.handleRun}/>

        <RaisedButton
          label="Help"
          onClick={this.handleOpen}
          style={style}
          />

          {/* <Link to={`/level/${this.props.userLevel}`}> */}
            { this.props.userLevel < 5 ?
              <RaisedButton
              label="Next Level"
              disabled={!this.state.next}
              style={style}
              onClick={(evt) => this.goNextLevel(evt, this.props.userLevel)}
            /> :
            <Link to="/"><RaisedButton
            label="Home"
            style={style}
            /></Link>
          }
          {/* </Link> */}

        <Directions
        actions={actions}
        open={this.state.open}
        close={this.handleClose}
        title="Help"
        />

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
    output: state.codeRunner,
    userLevel: state.userDetail
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
    pickUp: () => dispatch(dispatchWitchPickUpItem()),
    castSpell: () => dispatch(dispatchWitchCastSpell("Gothmog")),
    setLevel: (level) => {
      dispatch(dispatchUserLevel(level))
    },
    goNext: (levelId) => {
      dispatch(dispatchTextClearValue())
    },
    setLevelMap: (level) => dispatch(dispatchWitchLevel(level))
  }
}

export default withRouter(connect(mapState, mapDispatch)(Editor));
