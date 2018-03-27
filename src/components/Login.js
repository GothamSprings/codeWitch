
import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import * as firebase from 'firebase'
import { firebaseApp } from '../Firebase'
import './Sign.css'

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  paddingTop: 75,
};

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
        <div className="header-links">
          <h4 className="link"><Link to="/signup">Sign Up</Link></h4>
          
        </div>
        {this.state.error.message && (
          <div className="error">
            {this.state.error.message}
          </div>
        )}
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="email"
            onChange={event => this.setState({ email: event.target.value })}
          />
          <input
            className="form-control"
            type="password"
            placeholder="password"
            onChange={event => this.setState({ password: event.target.value })}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleSignIn}
            onKeyPress={event => event.key === 'Enter' && this.handleSignIn()}
          >
            Sign In
                    </button>
          
        </div>
      </div>
    )
  }
}

export default withRouter(Login);