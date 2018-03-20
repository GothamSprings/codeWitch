import React, { Component } from 'react';

class Blocks extends Component {

  componentDidMount() {
    const workspace = Blockly.inject('blocklyDiv', {media: './media', toolbox: document.getElementById('toolbox')});
  }

  render() {

    return (
      <div>
        <p>
		  <button onclick="runCode()" id="runButton">Run JavaScript</button>
		</p>

		<div style="width: 100%">
		  <div id="blocklyDiv" style="display: inline-block; height: 480px; width: 58%">
		  </div>
		  <textarea id="output" disabled="disabled" style="display: inline-block; height: 480px; width: 38%;">
		  </textarea>
		</div>

		<xml id="toolbox" style="display: none">
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