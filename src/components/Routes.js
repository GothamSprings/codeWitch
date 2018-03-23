import { Game, Board, Navbar, Directions, WorldStage } from './'
import Blocks from './blocks/Blocks';
import { Switch, Route, withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import React, { Component } from 'react';

class Routes extends Component {
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
const mapDispatch = () => { }


export default withRouter(connect(mapState, mapDispatch)(Routes))
