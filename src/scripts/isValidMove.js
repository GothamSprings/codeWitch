//pass in state and action, check if things work

export default function isValidMove(currentState, currentProps, currentCommand) {
  if (currentCommand === "right") {
    if (currentProps.witchX + 50 < currentState.stageWidth && currentProps.witchX + 50!==currentState.wallX) {
      return true;
    }
    else {
      return false;
    }
  } else if (currentCommand === "left") {
    if (currentProps.witchX - 50 >= 0  &&  currentProps.witchX + 50 !== currentState.wallX) {
      return true;
    } else {
      return false;
    }
  } else if (currentCommand === "down") {
    if (currentProps.witchY + 65 < currentState.stageWidth && currentProps.witchY + 50 !== currentState.wallY) {
      return true;
    } else {
      return false;
    }
  } else if (currentCommand === "up") {
    if (currentProps.witchY - 50 >= 0) {
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
