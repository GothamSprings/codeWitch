import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => (
  <div>
    <nav>
      <a className="home" href="#">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>CodeWitch</h1>
        </Link>
      </a>
      <span className="flex-right"><h8>Welcome, User!</h8></span>
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
