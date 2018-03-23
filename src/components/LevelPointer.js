import React from 'react';
import { Image } from 'react-konva';
import theArrow from '../assets/giphy.gif';
import history from '../history';


class LevelPointer extends React.Component {
    state = {
      image: null,
      xCoord: 32,
      yCoord: 2,
      level: 1,
    };
    handleClick = (evt, level) => {
      console.log(level);
      console.log('clicked!')
      history.push(`/level/${level}`)
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
