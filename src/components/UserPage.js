import React, { Component } from 'react';
import { firebaseApp } from '../Firebase'
import * as firebase from 'firebase'
import '../css/Sign.css'

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
      <div className="error">
       <p>{this.state.account.Badges}</p>
       <p>{this.state.account.level}</p>
       <p></p>
      </div>
    )
  }
}

export default UserPage;