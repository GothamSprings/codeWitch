import React from "react";
import { connect } from "react-redux";
import { Dialog, FlatButton, RaisedButton } from 'material-ui';

// import { Link } from "react-router-dom";

const Directions = (props) => (
       <Dialog
          title="Help"
          actions={props.actions}
          modal={false}
          open={props.open}
          onRequestClose={props.close}
        >
          Walk the witch to the end!
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
