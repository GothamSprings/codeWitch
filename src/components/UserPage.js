import React, { Component } from 'react';
import { firebaseApp } from '../Firebase'
import * as firebase from 'firebase'
import '../css/Sign.css'

const style = {
  paddingTop: '75px'
}

class UserPage extends Component {
  constructor() {
    super()
    this.state = {
      account:""
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        this.forceUpdate();
      });

     var ref = firebase.app().database().ref();
     ref.on('value', (snap) => {
       if (snap.val()) {
      Object.keys(snap.val()).forEach((uid)=>{
        if (firebaseApp.auth().currentUser.uid == uid) {
          this.setState({
            account:snap.val()[uid]
          })
            //console.log(snap.val()[uid].Badges)
             //account = snap.val()[uid]
            //return (snap.val()[uid].Badges)
          }
      })
         //console.log("account",account)
        //  return account
      }})
      // ref.once('value')
      // .then(function (snap) {
      //   console.log('snap.val', snap.val(), (Object.keys(snap.val())));
      //   (Object.keys(snap.val())).forEach((uid)=>{
      //     if (firebaseApp.auth().currentUser.uid == uid){
      //       //console.log(snap.val()[uid].Badges)
      //       //var account = snap.val()[uid]
      //       return (snap.val()[uid].Badges)
      //     }
      //   })
  //})
  }

  render() {
    return (
      <div className="error" style={style}>
        <h2>Your badges: {this.state.account.Badges}</h2>
        <h2>Your level: {this.state.account.level}</h2>
      </div>
    )
  }
}

export default UserPage;
