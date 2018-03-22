import React from 'react';
import { Image } from 'react-konva';
import theArrow from '../assets/giphy.gif';

class LevelPointer extends React.Component {
    state = {
      image: null
    };
    handleClick = () => {
      console.log('clicked!')
      this.setState({
      });
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
      <Image image={this.state.image} width={30} height={30} x={32} y={2} onClick={this.handleClick}/>
    );
  }
}

export default LevelPointer
