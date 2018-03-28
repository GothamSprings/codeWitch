
import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import * as firebase from 'firebase'
import { firebaseApp } from '../Firebase'
import '../css/Sign.css'

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  // paddingTop: 75,
};

const GREY = "#9E9E9E";

const formStyle = {
  fontSize: '2em',
  color: `${GREY}`,
  backgroundColor: 'black',
  border: 'none',
  borderBottom: `2px solid ${GREY}`
}

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

class Login extends Component {
  constructor(){
  super()
  this.state = {
    email: '',
    password: '',
    error: {
      message: ''
    }
  }
}
  handleSignIn = () => {
    const { email, password } = this.state;
    firebaseApp.auth().signInWithEmailAndPassword(email, password).then(result=>console.log(result))
      .catch(error => {
        this.setState({ error })
      })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push("/")
      }
    });
  }

  render() {
    console.log(firebaseApp.auth().currentUser && firebaseApp.auth().currentUser.email,"hereee")
    return (
      <div style={style} className="form-inline">
        {this.state.error.message && (
          <div className="error">
            {this.state.error.message}
          </div>
        )}
        <div className="form-group">
          <input
            style={formStyle}
            className="form-control"
            type="text"
            placeholder="email"
            onChange={event => this.setState({ email: event.target.value })}
          />
          <input
            style={formStyle}
            className="form-control"
            type="password"
            placeholder="password"
            onChange={event => this.setState({ password: event.target.value })}
          />
          <button
            style={buttonStyle}
            type="button"
            className="button"
            onClick={this.handleSignIn}
            onKeyPress={event => event.key === 'Enter' && this.handleSignIn()}
          >
            LogIn
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);
