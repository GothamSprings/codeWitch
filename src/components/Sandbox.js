import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Stage, Layer } from 'react-konva';
// import Konva from 'konva';

import { Background, Witch, EndPoint, Enemy, Item } from './'


class Sandbox extends Component {

  constructor (props) {
    super(props);
    this.state = {
      input: '',
      witchX: props.witchX,
      witchY: props.witchY,
      endX: 450,
      endY: 450,
      stageHeight: 512,
      stageWidth: 512,
    };
  }

  //witch position updates here
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      witchX: nextProps.witchX,
      witchY: nextProps.witchY
    })
  }

  // onLoad (document) {
  // }


  render() {

    const divStyle = {
      // margin: '40px',
      // border: '5px solid pink'
    };

    console.log("This should equal 1", this.props.level);
    console.log("this.props is: ", this.props);

    return (
      <div>
        <div style={divStyle}>
          <Stage width={this.state.stageWidth} height={this.state.stageHeight}>
            <Layer>
              <Background matchId={this.props.matchId}/>
            </Layer>
            <Layer>
              <EndPoint y={this.props.endY} x={this.props.endX} />
              <Witch y={this.props.witchY} x={this.props.witchX} />
              <Enemy y={this.props.monsterY} x={this.props.monsterX} />
              <Item y={this.props.itemY} x={this.props.itemX} />
            </Layer>
          </Stage>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    witchX: state.witchCoords.witchX,
    witchY: state.witchCoords.witchY,
    endX: state.witchCoords.endX,
    endY: state.witchCoords.endY,
    itemX: state.witchCoords.itemX,
    itemY: state.witchCoords.itemY,
    monsterX: state.witchCoords.monsterX,
    monsterY: state.witchCoords.monsterY
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default connect(mapState, mapDispatch)(Sandbox);
