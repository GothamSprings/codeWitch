import React, {Component} from "react";
import { Snackbar } from 'material-ui';

class GameError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: props.error,
      open: props.open
    };
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render(){
    return (
      <Snackbar
        open={this.state.open}
        message={this.props.title + ": " + this.props.errorMsg}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
        bodyStyle={{ backgroundColor: '#7B1FA2' }}
      />
    )
  }
}

export default GameError;
