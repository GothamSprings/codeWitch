import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import {Login , SignUp} from './'
import './Sign.css'
const Navbar = () => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" style={{ textDecoration: 'none' }}>
        <h1>CodeWitch</h1>
        </Link>
      <h4 className="link">  <Link to="/login"> Login </Link></h4>
      {/*<Link to="/signup"> Sign Up</Link>*/}
        {/*<Login />*/}
      <span className="flex-right"><h5>Welcome, User!</h5></span>
    </nav>
   {/*<Switch>
      <Route exact path="/login" render={() => <Login Login={Login} />} />
   </Switch> */} 
  </div>
);

const mapState = state => {
  const{user}=state
  return {
    user
  };
};

const mapDispatch = dispatch => {
  return {
  };
};

export default connect(mapState, mapDispatch)(Navbar);
