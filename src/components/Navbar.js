
import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { firebaseApp } from '../Firebase'
import * as firebase from 'firebase'
import '../css/Sign.css'
import witchHat from '../assets/codeWitch_hatIcon.png';


const GREY = "#9E9E9E";

const buttonStyle = {
  fontSize: '1em'
}

const imgSize = {
  marginLeft: '10'
}

const divSpacer = {
  marginTop: '10px',
  // paddingTop: '50px'
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

              <Link to="/" className="link">
              <img src={witchHat} height={30} style={imgSize} />
              &nbsp;CodeWitch </Link>
            </li>
            {firebaseApp.auth().currentUser ? <div className="error"><Link to="/userpage"> Welcome {firebaseApp.auth().currentUser.email}</Link><button style={buttonStyle} className='button' onClick={this.onClick}>Log out</button></div> :
              <div style={divSpacer}><li className="right" style={divSpacer}><Link to="/login" className="link"> Log in </Link></li>
              <li className="right"><Link to="/signup" className="link"> Sign up </Link></li></div>}
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
