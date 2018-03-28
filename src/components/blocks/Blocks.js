import Blockly from 'node-blockly/browser';
import Interpreter from 'js-interpreter';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  dispatchWitchMoveUp, dispatchWitchMoveDown,
  dispatchWitchMoveLeft, dispatchWitchMoveRight,
  dispatchWitchReset,
  dispatchWitchPickUpItem, dispatchWitchCastSpell,
  dispatchUserLevel, dispatchWitchLevel
  } from '../../store';

import { FlatButton, RaisedButton } from 'material-ui';
import { Directions } from '../'

const style = {
  margin: 12,
};

Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
Blockly.JavaScript.addReservedWords('highlightBlock');

// defining blocks
Blockly.Blocks['witch_up'] = {
  init: function() {
    this.appendDummyInput().appendField('witch up'); // word(s) inside the block
    this.setPreviousStatement(true, null); // top connector
    this.setNextStatement(true, null); // bottom connector
    this.setColour(300); // color
  }
};
Blockly.Blocks['witch_down'] = {
  init: function() {
    this.appendDummyInput().appendField('witch down');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
  }
};
Blockly.Blocks['witch_left'] = {
  init: function() {
    this.appendDummyInput().appendField('witch left');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
  }
};
Blockly.Blocks['witch_right'] = {
  init: function() {
    this.appendDummyInput().appendField('witch right');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
  }
};
Blockly.Blocks['pick_up'] = {
  init: function() {
    this.appendDummyInput().appendField('pick it up');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
  }
};
Blockly.Blocks['cast_spell'] = {
  init: function() {
    this.appendDummyInput().appendField('cast spell');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
  }
};
Blockly.Blocks['near_a_monster'] = {
  init: function() {
    this.appendDummyInput().appendField('near a monster');
    this.setOutput(true, null);
    this.setColour(345);
  }
};


// defining block behaviors
Blockly.JavaScript['witch_up'] = function(block) {
  return '__witch_up();\n'; // this will go to the interpreter
};
Blockly.JavaScript['witch_down'] = function(block) {
  return '__witch_down();\n';
};
Blockly.JavaScript['witch_left'] = function(block) {
  return '__witch_left();\n';
};
Blockly.JavaScript['witch_right'] = function(block) {
  return '__witch_right();\n';
};
Blockly.JavaScript['pick_up'] = function(block) {
  return '__pick_up();\n';
};
Blockly.JavaScript['cast_spell'] = function(block) {
  return '__cast_spell();\n';
};
Blockly.JavaScript['near_a_monster'] = function(block) {
  return ['__near_a_monster()', Blockly.JavaScript.ORDER_NONE];
};


function createWitchApi(comp) {
  return function(interpreter, scope) {
    interpreter.setProperty(scope, 'highlightBlock',
      interpreter.createNativeFunction(function(id) {
        comp.witchWorkspace.highlightBlock(id);
      }));

    interpreter.setProperty(scope, '__witch_up',
        interpreter.createNativeFunction(function() {
      comp.props.move_up(); // define the function to make witch move on canvas
    }));
    interpreter.setProperty(scope, '__witch_down',
        interpreter.createNativeFunction(function() {
      comp.props.move_down();
    }));
    interpreter.setProperty(scope, '__witch_left',
        interpreter.createNativeFunction(function() {
      comp.props.move_left();
    }));
    interpreter.setProperty(scope, '__witch_right',
        interpreter.createNativeFunction(function() {
      comp.props.move_right();
    }));
    interpreter.setProperty(scope, '__pick_up',
        interpreter.createNativeFunction(function() {
      comp.props.pick_up();
    }));
    interpreter.setProperty(scope, '__cast_spell',
        interpreter.createNativeFunction(function() {
      comp.props.cast_spell();
    }));
    interpreter.setProperty(scope, '__near_a_monster',
      interpreter.createNativeFunction(function() {
        return {
          toBoolean: () => {
            return comp.props.near_a_monster;
          }
        };
    }));
  }
};

const workspaceStyle = {
  height: '512px',
  width: '512px'
};

// const toolboxXml = `<xml>
//     <block type="witch_up"></block>
//     <block type="witch_down"></block>
//     <block type="witch_left"></block>
//     <block type="witch_right"></block>
//     <block type="pick_up"></block>
//     <block type="cast_spell"></block>
//     <block type="near_a_monster"></block>
//     <block type="controls_repeat_ext">
//       <value name="TIMES">
//         <block type="math_number">
//           <field name="NUM">10</field>
//         </block>
//       </value>
//     </block>
//     <block type="controls_if"></block>
//   </xml>`;

const toolboxBeginning = `<xml>
    <block type="witch_up"></block>
    <block type="witch_down"></block>
    <block type="witch_left"></block>
    <block type="witch_right"></block>
    <block type="controls_repeat_ext">
      <value name="TIMES">
        <block type="math_number">
          <field name="NUM">10</field>
        </block>
      </value>
    </block>`;
const toolboxEnding = `</xml>`;
const toolboxLevel3 = `<block type="pick_up"></block>`;
const toolboxLevel4 = `<block type="cast_spell"></block>
    <block type="near_a_monster"></block>
    <block type="controls_if"></block>`;

let toolboxXml = ``;

function createToolboxXml(level) {
  if(level <= 2) {
    toolboxXml = toolboxBeginning + toolboxEnding;
  } else if(level >= 3) {
    toolboxXml = toolboxBeginning + toolboxLevel3 + toolboxLevel4 + toolboxEnding;
  }
}


class Blocks extends Component {

  constructor() {
    super();
    this.state = {
      open: true
    }
  	this.runCode = this.runCode.bind(this);
  }

  componentDidMount() {
    createToolboxXml(this.props.level); // this.props.level comes from Game.js
    this.witchWorkspace = Blockly.inject('blocklyDiv', {media: './media', toolbox: toolboxXml});
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  }

  runCode() {
    this.props.reset();
    let code = Blockly.JavaScript.workspaceToCode(this.witchWorkspace);
    console.log("let's see what the code looks like");
    console.log(code);
    console.log("check out the code above");
    let interpreter = new Interpreter(code, createWitchApi(this));
    // interpreter.run(); // run the code as a whole
    let id = setInterval(() => {
      try {
        if (this.props.at_end_point) {
          console.log('this.props.atendpoint: ' + this.props.at_end_point);
          clearInterval(id);
          alert("Success! You can now enter the next level!");
          this.props.reset();
          this.props.set_user_level(this.props.userLevel + 1); // reset witch position
          // this.props.get_next_game(this.props.gameLevel + 1); // go to the next level
        }
        if (!interpreter.step()) {
          clearInterval(id);
          this.witchWorkspace.highlightBlock(null);
        }
      } catch(e) {
        clearInterval(id);
        this.witchWorkspace.highlightBlock(null);
        alert("An " + e);
      }
    }, 20);
  }

  render() {
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

    return (
      <div>
      	<div>
      	  <div id="blocklyDiv" style={workspaceStyle}></div>
        </div>
        <p>
          <RaisedButton
            label="Run Blocks"
            secondary={true}
            style={style}
            onClick={this.runCode}/>
        </p>
          <RaisedButton
            label="Help"
            onClick={this.handleOpen}
          />
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
  console.log(state);
  return {
    witchBag: state.witchCoords.witchBag,
    near_a_monster: state.witchCoords.near_a_monster,
    at_end_point: state.witchCoords.at_end_point,
    userLevel: state.userDetail,
    gameLevel: state.witchCoords.level
  };
}

const mapDispatch = (dispatch) => {
  return {
    move_up: () => dispatch(dispatchWitchMoveUp()),
    move_down: () => dispatch(dispatchWitchMoveDown()),
    move_left: () => dispatch(dispatchWitchMoveLeft()),
    move_right: () => dispatch(dispatchWitchMoveRight()),
    pick_up: () => dispatch(dispatchWitchPickUpItem("key")),
    cast_spell: () => dispatch(dispatchWitchCastSpell("Gothmog")),
    reset: () => dispatch(dispatchWitchReset()),
    set_user_level: (level) => dispatch(dispatchUserLevel(level)),
    get_next_game: (level) => dispatch(dispatchWitchLevel(level))
  };
}

export default connect(mapState, mapDispatch)(Blocks);
