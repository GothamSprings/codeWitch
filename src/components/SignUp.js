
import React, { Component } from 'react';
import { firebaseApp } from '../Firebase'
import '../css/Sign.css'
import * as firebase from 'firebase'
import { withRouter } from 'react-router-dom';

var database = firebase.database();

const GREY = "#9E9E9E";

const formStyle = {
  fontSize: '2em',
  color: `${GREY}`,
  backgroundColor: 'black',
  border: 'none',
  borderBottom: `2px solid ${GREY}`
}

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%'
  // paddingTop: 75,
};

const buttonStyle = {
  border: `2px solid ${GREY}`
}

class SignUp extends Component {

  state = {

    email: '',
    password: '',
    error: {
      message: ''
    }
  }

  handleSignUp = () => {
    const {email, password } = this.state;
    firebaseApp.auth().createUserWithEmailAndPassword( email, password)
      .catch(error => {
        this.setState({ error })
      })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        database.ref( user.uid).set({
          level: 'level 1',
          Badges: 0,
          HigestLevel:"",
          currentLevel: 'level 1'
        });
        console.log(user)
        this.props.history.push("/")
      }
  })
}

  render() {
    return (
      <div className="form-inline" style={style}>
        {this.state.error.message && (
          <div className="error">
            {this.state.error.message}
          </div>
        )}
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
            onClick={this.handleSignUp}
            onKeyPress={event => event.key === 'Enter' && this.handleSignUp()}
          >
            Sign up
          </button>
        </div>
    )
  }
}

export default withRouter(SignUp);
