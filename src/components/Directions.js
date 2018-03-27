import React from "react";
import { connect } from "react-redux";
import { Dialog } from 'material-ui';

const config = require('../scripts/config')
// import { Link } from "react-router-dom";

const Directions = (props) => {
  let levelConfig = config.levels[props.level]
  let type = props.type

  return(
    <Dialog
       title={props.title}
       actions={props.actions}
       modal={false}
       open={props.open}
       onRequestClose={props.close}
     >
      <p dangerouslySetInnerHTML={{__html: levelConfig.tutorial[type]}} />
     </Dialog>
)};

const mapState = state => {
  return {
    type: state.gameType,
    level: state.witchCoords.level
  };
};

const mapDispatch = dispatch => {
  return {
  };
};

export default connect(mapState, mapDispatch)(Directions);
