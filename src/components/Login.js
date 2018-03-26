// import React, { Component } from 'react'
//  import { StyledFirebaseAuth } from 'react-firebaseui'
// // import firebase from 'firebase'
// import * as firebase from 'firebase';


// // Configure FirebaseUI.
// const uiConfig = {
//   // Popup signin flow rather than redirect flow.
//   signInFlow: 'redirect',
//   // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//   signInSuccessUrl: '/signedin',
//   // We will display Github as the auth provider.
//   signInOptions: [
//     firebase.auth.GithubAuthProvider.PROVIDER_ID
//   ]
// };

// class Login extends Component {
//   render() {
//     return (
//       <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
//     );
//   }
// }

// export default Login
// import React, { Component } from 'react';
// import { login, getUser } from '../store/user';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
//import {user} from '../store'
//import { Route, Switch, Link } from "react-router-dom";
//import SignUp from './SignUp'


// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       password: ''
     
//     };
//     this.handleChange = this.handleChange.bind(this);
//   }

//   componentWillMount() {
//     if (this.props.user !== null) {
//       this.props.history.push('/');
//     }
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.user !== null) {
//       nextProps.history.push('/');
//     }
//   }

//   handleChange(event) {
//     this.setState({ [event.target.name]: event.target.value });
//   }

//   submitLogin(eve) {
//     eve.preventDefault();
//     const email = eve.target.email.value
//     const password = eve.target.password.value
//     this.props.login(email, password)
//   }

//   render() {
//     console.log(this.props,"state",this.state)
//     return (
//       <div>
//         <h3> Login</h3>
//         <form onSubmit={eve => { this.submitLogin(eve); }}>
//           <h4>Email</h4>
//           <input type="text" name="email" onChange={this.handleChange}  />
//           <h4>Password</h4>
//           <input type="text" name="password" onChange={this.handleChange}/>
//           <br />
//           <div><button type="submit">Submit</button> </div>
//         </form>
        
      
//       </div>
//     )
//   }
// }
// function mapStateToProps(state, ownProps) {
//   return { user: state.user, withRouter};
// }

// export default connect(mapStateToProps, { login, getUser})(Login);
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { firebaseApp } from '../Firebase'
import './Sign.css'

class Login extends Component {

  state = {
    email: '',
    password: '',
    error: {
      message: ''
    }
  }

  handleSignIn = () => {
    const { email, password } = this.state;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    console.log(this.props.Login,"propsss")
    return (
      <div className="form-inline">
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

export default Login;