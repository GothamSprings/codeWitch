import React from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

const Directions = () => (
  <div>
    <h3>Tutorial!</h3>
    <p>Walk your witch down to the signpost</p>
  </div>
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
