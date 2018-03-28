
import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { firebaseApp } from '../Firebase'
import * as firebase from 'firebase'
import '../css/Sign.css'

const GREY = "#9E9E9E";

const buttonStyle = {
  backgroundColor: 'black',
  border: '2px solid #ccc',
  color: `${GREY}`,
  marginTop: '5px',
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '1em'
}

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
      <div >
        <nav>
          <ul className="header">
            <li className="left">
              <Link to="/" className="link"> CodeWitch </Link>
            </li>
            {firebaseApp.auth().currentUser ? <div className="error"><Link to="/userpage"> Welcome {firebaseApp.auth().currentUser.email}</Link><button style={buttonStyle} className='button' onClick={this.onClick}>LogOut</button></div> :
              <div><li className="right"><Link to="/login" className="link"> Login </Link></li>
              <li className="right"><Link to="/signup" className="link"> SignUp </Link></li></div>}
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
