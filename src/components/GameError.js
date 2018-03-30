import React, {Component} from "react";
import { Dialog } from 'material-ui';

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
      <Dialog
        title={this.props.title}
        actions={this.props.actions}
        modal={false}
        open={this.props.open}
      >
        <p>{this.props.message}</p>
      </Dialog>
    )
  }
}

export default GameError;
