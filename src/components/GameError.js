import React, {Component} from "react";
import { Snackbar } from 'material-ui';

class GameError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: props.error
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
        open={this.props.open}
        message={this.props.error[0].toString()}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
      />
    )
  }
}

export default GameError;
