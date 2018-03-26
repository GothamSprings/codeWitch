import Blockly from 'node-blockly/browser';
import Interpreter from 'js-interpreter';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  dispatchWitchMoveUp, dispatchWitchMoveDown,
  dispatchWitchMoveLeft, dispatchWitchMoveRight,
  dispatchWitchReset,
  dispatchWitchPickUpItem, dispatchWitchCastSpell,
  dispatchUserLevel
  } from '../../store';

import RaisedButton from 'material-ui/RaisedButton';

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
Blockly.Blocks['near_an_ogre'] = {
  init: function() {
    this.appendDummyInput().appendField('near an ogre, or a troll?');
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
Blockly.JavaScript['near_an_ogre'] = function(block) {
  return ['__ogre_wrapper.near_an_ogre', Blockly.JavaScript.ORDER_MEMBER];
};


function createWitchApi(props, workspace) {
  return function(interpreter, scope) {
    interpreter.setProperty(scope, 'highlightBlock',
      interpreter.createNativeFunction(function(id) {
        workspace.highlightBlock(id);
      }));

    interpreter.setProperty(scope, '__witch_up',
        interpreter.createNativeFunction(function() {
      props.move_up(); // define the function to make witch move on canvas
    }));
    interpreter.setProperty(scope, '__witch_down',
        interpreter.createNativeFunction(function() {
      props.move_down();
    }));
    interpreter.setProperty(scope, '__witch_left',
        interpreter.createNativeFunction(function() {
      props.move_left();
    }));
    interpreter.setProperty(scope, '__witch_right',
        interpreter.createNativeFunction(function() {
      props.move_right();
    }));
    interpreter.setProperty(scope, '__pick_up',
        interpreter.createNativeFunction(function() {
      props.pick_up();
    }));
    interpreter.setProperty(scope, '__cast_spell',
        interpreter.createNativeFunction(function() {
      props.cast_spell();
    }));
    interpreter.setProperty(scope, '__ogre_wrapper',
      { near_an_ogre: props.near_an_ogre } // the wrapper has to be an object
    );
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
//     <block type="near_an_ogre"></block>
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
    <block type="near_an_ogre"></block>
    <block type="controls_if"></block>`;

let toolboxXml = ``;

function createToolboxXml(level) {
  if(level < 3) {
    toolboxXml = toolboxBeginning + toolboxEnding;
  } else if(level === 3) {
    toolboxXml = toolboxBeginning + toolboxLevel3 + toolboxEnding;
  } else if(level === 4) {
    toolboxXml = toolboxBeginning + toolboxLevel3 + toolboxLevel4 + toolboxEnding;
  }
}


class Blocks extends Component {

  constructor() {
  	super();
  	this.runCode = this.runCode.bind(this);
  }

  componentDidMount() {
    createToolboxXml(this.props.level); // this.props.level comes from Game.js
    this.witchWorkspace = Blockly.inject('blocklyDiv', {media: './media', toolbox: toolboxXml});
  }

  runCode() {
    this.props.reset();
    let code = Blockly.JavaScript.workspaceToCode(this.witchWorkspace);
    console.log("let's see what the code looks like");
    console.log(code);
    console.log("check out the code above");
    let interpreter = new Interpreter(code, createWitchApi(this.props, this.witchWorkspace));
    // interpreter.run(); // run the code as a whole
    let id = setInterval(() => {
      try {
        if (this.props.at_end_point) {
          console.log('this.props.atendpoint: ' + this.props.at_end_point);
          clearInterval(id);
          alert("Success! You can now enter the next level!");
          this.props.set_user_level(this.props.userLevel + 1);
        }
        if (!interpreter.step()) {
          clearInterval(id);
          this.witchWorkspace.highlightBlock(null);
        }
      } catch(e) {
        clearInterval(id);
        this.witchWorkspace.highlightBlock(null);
        alert("Something is wrong, and it is this => " + e);
      }
    }, 20);
  }

  render() {
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
      </div>
    )
  }
}


const mapState = (state) => {
  console.log(state);
  return {
    witchBag: state.witchCoords.witchBag,
    near_an_ogre: state.witchCoords.near_an_ogre,
    at_end_point: state.witchCoords.at_end_point,
    userLevel: state.userDetail
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
    set_user_level: (level) => dispatch(dispatchUserLevel(level))
  };
}

export default connect(mapState, mapDispatch)(Blocks);
