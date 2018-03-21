Blockly.Blocks['witch_up'] = {
  init: function() {
    this.appendDummyInput().appendField('witch up');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
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

Blockly.JavaScript['witch_up'] = function(block) {
  return '__witch_up();';
};
Blockly.JavaScript['witch_down'] = function(block) {
  return '__witch_down();';
};
Blockly.JavaScript['witch_left'] = function(block) {
  return '__witch_left();';
};
Blockly.JavaScript['witch_right'] = function(block) {
  return '__witch_right();';
};

function witchApi(interpreter, scope) {
  interpreter.setProperty(scope, '__witch_up',
      interpreter.createNativeFunction(function() {
    witchUp();
  }));
  interpreter.setProperty(scope, '__witch_down',
      interpreter.createNativeFunction(function() {
    witchDown();
  }));
  interpreter.setProperty(scope, '__witch_left',
      interpreter.createNativeFunction(function() {
    witchLeft();
  }));
  interpreter.setProperty(scope, '__witch_right',
      interpreter.createNativeFunction(function() {
    witchRight();
  }));
}
