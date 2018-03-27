import React from "react";
import { connect } from "react-redux";
import { Dialog, FlatButton, RaisedButton } from 'material-ui';

const Directions = (props) => (
       <Dialog
          title="What's your kind of magic"
          actions={props.actions}
          modal={false}
          open={props.open}
        >
          Choose a programming style to play the game.
        </Dialog>
);

const mapState = state => {
  return {
  };
};

const mapDispatch = dispatch => {
  return {
  };
};

export default connect(mapState, mapDispatch)(Directions);
