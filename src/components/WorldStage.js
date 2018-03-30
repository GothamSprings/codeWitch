import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Stage, Layer } from 'react-konva';

import { WorldMap, LevelPointer, StartDialog } from './'
import { dispatchGameType, dispatchWitchLevel, dispatchUserLevel } from '../store'

import { RaisedButton, Snackbar } from 'material-ui';

import * as firebase from 'firebase';
import { firebaseApp } from '../Firebase';

import '../css/Sign.css'


const buttonStyle = {
  fontFamily: 'Roboto Condensed',
  margin: 12,
};

const GREY = "#9E9E9E";

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  paddingTop: 100,
  borderRadius: '50px 20px'
};

const mapStyle = {
  padding: 10,
  display: 'flex',
  justifyContent: 'center',
  width:'100%',
}

const shadow = {
  boxShadow: `0px 0px 25px 10px ${GREY}`
}

class WorldStage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      snackbarOpen: false
    }
  }

  handleClose = (evt, type) => {
    this.props.handleClick(evt, type);
    this.setState({ open: false, snackbarOpen: true });
  }


  render () {

    const actions = [
      <RaisedButton
        label="Blockly"
        primary={true}
        style={buttonStyle}
        onClick={(evt) => this.handleClose(evt, 'blockly')}
      />,
      <RaisedButton
        label="Text Editor"
        primary={true}
        style={buttonStyle}
        onClick={(evt) => this.handleClose(evt, 'text')}
      />,
    ];
    return(
      <div style={style}>
        <div style={mapStyle}>
        <Stage width={1280} height={640} style={shadow}>
          <Layer>
            <WorldMap />
            <LevelPointer
              gameType={this.props.gameType}
              userDetail={this.props.userDetail}
              setLevelMap={this.props.setLevelMap}
              levelNumber={1}/>
            <LevelPointer
              gameType={this.props.gameType}
              userDetail={this.props.userDetail}
              setLevelMap={this.props.setLevelMap}
              levelNumber={2}/>
             <LevelPointer
              gameType={this.props.gameType}
              userDetail={this.props.userDetail}
              setLevelMap={this.props.setLevelMap}
              levelNumber={3}/>
             <LevelPointer
              gameType={this.props.gameType}
              userDetail={this.props.userDetail}
              setLevelMap={this.props.setLevelMap}
              levelNumber={4}/>
             <LevelPointer
              gameType={this.props.gameType}
              userDetail={this.props.userDetail}
              setLevelMap={this.props.setLevelMap}
              levelNumber={5}/>
          </Layer>
        </Stage>

        { this.props.gameType ? (
          <StartDialog
          actions={actions}
          open={false}
          close={this.handleClose}
          /> ) : (
          <StartDialog
          actions={actions}
          open={this.state.open}
          close={this.handleClose}
          />
          )
        }
          <Snackbar
            open={this.state.snackbarOpen}
            message={`Your chose to play with ${this.props.gameType}. Select your game level.`}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
            bodyStyle={{ backgroundColor: '#7B1FA2' }}
          />
        </div>

        {this.props.gameType !== "" ? <div><RaisedButton
          label="Blockly"
          primary={true}
          style={buttonStyle}
          onClick={(evt) => this.handleClose(evt, 'blockly')}
        />
        <RaisedButton
          label="Text Editor"
          primary={true}
          style={buttonStyle}
            onClick={(evt) => this.handleClose(evt, 'text')}
        /></div>:<div/>}

      </div>
    )
  }
}

const mapState = (state) => {
  return {
    gameType: state.gameType,
    userDetail: state.userDetail
  //level pointer position probably here
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick(evt, type) {
      evt.preventDefault();
      //gameTypeChosenAlert(`You chose to play with ${type}. Now choose the game level.`, 1500);
      dispatch(dispatchGameType(type))
    },
    setLevelMap: (level) => {
      dispatch(dispatchUserLevel(level))
      dispatch(dispatchWitchLevel(level))
    }
  }
}

function gameTypeChosenAlert(msg,duration) {
  var el = document.createElement("div");
  el.setAttribute("style", "position: absolute; bottom: 10%; left: 30%; background-color: white;");
  el.innerHTML = msg;
  setTimeout(function(){
    el.parentNode.removeChild(el);
    },duration);
  document.body.appendChild(el);
}

export default connect(mapState, mapDispatch)(WorldStage);
