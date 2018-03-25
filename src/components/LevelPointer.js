import React from 'react';
import { Image } from 'react-konva';
import theArrow from '../assets/giphy.gif';
import history from '../history';


class LevelPointer extends React.Component {
    state = {
      image: null,
      xCoord: 32,
      yCoord: 2,
      level: this.props.userDetail,
      // type: this.state.type
    };
    handleClick = (evt, level) => {
      // console.log(level);
      // console.log(this.props.userDetail)
      history.push({
        pathname: `/level/${level}`,
        state: { type: this.props.gameType }
      })
    }

  componentDidMount() {
    const image = new window.Image();
    image.src = theArrow;
    image.onload = () => {
      this.setState({
        image: image
      });
    };
  }

  render() {
    return (
      <Image image={this.state.image} width={30} height={30} x={this.state.xCoord} y={this.state.yCoord} level={this.state.level} onClick={(evt) => this.handleClick(evt, this.state.level)}/>
    );
  }
}

export default LevelPointer
