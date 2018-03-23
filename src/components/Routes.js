import { Game, Board, Navbar, Directions, WorldStage } from './'
import Blocks from './blocks/Blocks';
import { Switch, Route, withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import React, { Component } from 'react';
import { dispatchGameType } from '../store';

class Routes extends Component {

  componentDidMount () {
    this.props.loadInitialData()
  }

  render() {
    return (
    <Switch>
    <Route exact path="/" component={WorldStage} />
      <Route exact path="/level/:id" component={Game} />
  </Switch>
    );
  }
}
const mapState = (state) => { }
const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(dispatchGameType(''))
    }
  }
 }


export default withRouter(connect(mapState, mapDispatch)(Routes))
