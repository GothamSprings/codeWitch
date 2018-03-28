import { Game, WorldStage , Login ,SignUp ,UserPage} from './'
// import Blocks from './blocks/Blocks';
import { Switch, Route, withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import React, { Component } from 'react';
import { dispatchGameType, dispatchUserLevel } from '../store';


class Routes extends Component {

  componentDidMount () {
    this.props.loadInitialData()
  }

  render() {
    return (
    <Switch>
      <Route exact path="/" component={WorldStage} />
      <Route exact path="/level/:id" component={Game} />
      <Route exact path="/login" render={() => <Login Login={Login} />} />
      <Route exact path="/signup" render={() => <SignUp SignUp={SignUp} />} />
      <Route exact path='/userpage' render={() => <UserPage UserPage={UserPage} />} />
      
    </Switch>
    );
  }
}
const mapState = (state) => {
  return {

  }
 }
const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(dispatchGameType(''))
      dispatch(dispatchUserLevel(1))
    }
  }
 }


export default withRouter(connect(mapState, mapDispatch)(Routes))
