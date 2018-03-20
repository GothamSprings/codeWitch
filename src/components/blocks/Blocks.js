import React, { Component } from 'react';
import Blockly from 'node-blockly/browser';

class Blocks extends Component {

  componentDidMount() {
    const witchWorkspace = Blockly.inject('blocklyDiv', {media: './media', toolbox: document.getElementById('toolbox')});
  }

  // runCode() {
  //   let code = Blockly.JavaScript.workspaceToCode(witchWorkspace);
  //   let interpreter = new Interpreter(code, witchApi);
  //   outputArea.value = '';
  //   interpreter.run();
  // }

  render() {
    return (
      <div>
        <p>
		  <button onclick="runCode()" id="runButton">Run JavaScript</button>
		</p>

		<div>
		  <div id="blocklyDiv">
		  </div>
		  <textarea id="output" disabled="disabled">
		  </textarea>
		</div>

		<xml id="toolbox">
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
		  </block>
		</xml>
      </div>
    )
  }
}

export default Blocks;