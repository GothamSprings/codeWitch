
import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { firebaseApp } from '../Firebase'
import * as firebase from 'firebase'
import '../css/Sign.css'


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
      <div className="header">
        <nav className="">
          <ul>
            <li>
              <Link to="/" className="link"> CodeWitch </Link>
            </li>
            {firebaseApp.auth().currentUser ? <button onClick={this.onClick}>LogOut</button> :
            <li><Link to="/login" className="link"> Login </Link></li>}
            </ul>
        </nav>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
  };
};

export default connect(null, mapDispatch)(Navbar);
