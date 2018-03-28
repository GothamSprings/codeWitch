import React from "react";
import { connect } from "react-redux";
import { Dialog } from 'material-ui';

import '../css/Sign.css'

const Directions = (props) => (
       <Dialog
          title="What's your kind of magic"
          actions={props.actions}
          modal={false}
          open={props.open}
        >
          <p>Choose a programming style to play the game.</p>
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
