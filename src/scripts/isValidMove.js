//pass in state and action, check if things work

export default function isValidMove(currentState, currentProps, currentCommand) {
  if (currentCommand === "witch.moveRight();") {
    if (currentProps.witchX + 50 < currentState.stageWidth) {
      return true;
    }
    else {
      return false;
    }
  } else if (currentCommand === "witch.moveLeft();") {
    if (currentProps.witchX - 50 >= 0) {
      return true;
    } else {
      return false;
    }
  } else if (currentCommand === "witch.moveDown();") {
    if (currentProps.witchY + 65 < currentState.stageWidth) {
      return true;
    } else {
      return false;
    }
  } else if (currentCommand === "witch.moveUp();") {
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
