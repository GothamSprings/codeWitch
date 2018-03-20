//pass in state and action, check if things work

export default function isValidMove(currentState, currentCommand) {
  if (currentCommand === 'right') {
    if (currentState.witchX + currentCommand.witchX <= currentState.stageWidth) {
      return true;
    }
    else {
      return false;
    }
  } else if (currentCommand === 'left') {
    if (currentState.witchX - currentCommand.witchX >= 0) {
      return true;
    } else {
      return false;
    }
  } else if (currentCommand === 'down') {
    if (currentState.witchY + currentCommand.witchX <= currentState.stageWidth) {
      return true;
    } else {
      return false;
    }
  } else if (currentCommand === 'up') {
    if (currentState.witchY - currentCommand.witchX <= currentState.stageWidth) {
      return true;
    } else {
      return false;
    }
  }
}

// if (this.state.witchX >= this.state.endX - 25 && this.state.witchY >= this.state.endY - 45 ) {
//   alert('Winner winner chicken dinner!')
//   this.setState({
//     witchX: 20,
//     witchY: 20
//   });
// }
