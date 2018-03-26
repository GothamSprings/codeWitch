import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import {Login , SignUp} from './'
import './Sign.css'




const Navbar = () => (
  <div className="header">
    <nav className="">
      <ul>
        <li><Link to="/" className="link"> CodeWitch </Link></li>
        <li><Link to="/login" className="link"> Login </Link></li>
      </ul>
      {/*<Link to="/signup"> Sign Up</Link>*/}
      {/*<Login />*/}
      {/* <span className="flex-right"><h5>Welcome, User!</h5></span> */}
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
