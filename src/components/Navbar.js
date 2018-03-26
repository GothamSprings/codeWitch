import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import {Login} from './'

const Navbar = () => (
  <div>
    <nav>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>CodeWitch</h1>
        </Link>
        {/*<Login />*/}
      <span className="flex-right"><h5>Welcome, User!</h5></span>
    </nav>
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

export default connect(mapState, mapDispatch)(Navbar);
