import Blockly from 'node-blockly/browser';
import Interpreter from 'js-interpreter';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { dispatchWitchMoveRight } from '../../store';


// defining blocks
Blockly.Blocks['witch_up'] = {
  init: function() {
    this.appendDummyInput().appendField('witch up'); // word(s) inside the block
    this.setPreviousStatement(true, null); // top connector
    this.setNextStatement(true, null); // bottom connector
    this.setColour(160); // color
  }
};
Blockly.Blocks['witch_down'] = {
  init: function() {
    this.appendDummyInput().appendField('witch down');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
  }
};
Blockly.Blocks['witch_left'] = {
  init: function() {
    this.appendDummyInput().appendField('witch left');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
  }
};
Blockly.Blocks['witch_right'] = {
  init: function() {
    this.appendDummyInput().appendField('witch right');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
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

function createWitchApi(props) {
  return function(interpreter, scope) {
    interpreter.setProperty(scope, '__witch_up',
        interpreter.createNativeFunction(function() {
      console.log("up!");  // witchUp(); // define the function to make witch move on canvas
    }));
    interpreter.setProperty(scope, '__witch_down',
        interpreter.createNativeFunction(function() {
      console.log("down!");  // witchDown();
    }));
    interpreter.setProperty(scope, '__witch_left',
        interpreter.createNativeFunction(function() {
      console.log("left!");  // witchLeft();
    }));
    interpreter.setProperty(scope, '__witch_right',
        interpreter.createNativeFunction(function() {
      props.move_right();
    }));
  }
};

const workspaceStyle = {
  height: '500px',
  width: '500px'
};

const toolboxXml = `<xml>
    <block type="witch_up"></block>
    <block type="witch_down"></block>
    <block type="witch_left"></block>
    <block type="witch_right"></block>
    <block type="controls_repeat_ext">
      <value name="TIMES">
        <block type="math_number">
          <field name="NUM">2</field>
        </block>
      </value>
    </block>
  </xml>`;

class Blocks extends Component {

  constructor() {
  	super();
  	this.runCode = this.runCode.bind(this);
  }


  componentDidMount() {
    this.witchWorkspace = Blockly.inject('blocklyDiv', {media: './media', toolbox: toolboxXml});
  }

  runCode() {
    let code = Blockly.JavaScript.workspaceToCode(this.witchWorkspace);
    console.log("let's see what the code looks like");
    console.log(code);
    console.log("check out the code above");
    let interpreter = new Interpreter(code, createWitchApi(this.props));
    interpreter.run();
  }

  render() {
    return (
      <div>
        <p>
		  <button onClick={this.runCode} id="runButton">Run JavaScript</button>
		</p>
		<div>
		  <div id="blocklyDiv" style={workspaceStyle}></div>
		</div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {

  }
}

const mapDispatch = (dispatch) => {
  return {
    move_right: () => dispatch(dispatchWitchMoveRight())
  }
}

export default connect(mapState, mapDispatch)(Blocks);
