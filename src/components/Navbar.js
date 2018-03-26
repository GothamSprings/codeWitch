
import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { firebaseApp } from '../Firebase'
import * as firebase from 'firebase'
//import {Login , SignUp} from './'
import './Sign.css'


class Navbar extends Component {
  constructor(props) {
    super(props);

  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        this.forceUpdate();
      }
    );
    this.onClick = this.onClick.bind(this)
  }
  onClick = ()=> {
    firebase.auth().signOut()
  }

  render() {
    return (

  <div>
    <nav>
        <Link to="/" style={{ textDecoration: 'none' }}>
        <h1>CodeWitch</h1>
        </Link>
      {firebaseApp.auth().currentUser ? <button onClick={this.onClick}>LogOut</button> :
      <h4 className="link">  <Link to="/login"> Login </Link></h4>}
      <span className="flex-right"><h5>Welcome</h5></span>
    </nav>
   
  </div>

    )
  }
}



// const mapState = state => {
//   const{user}=state
//   return {
//     user
//   };
// };

const mapDispatch = dispatch => {
  return {
  };
};

export default connect(null, mapDispatch)(Navbar);

