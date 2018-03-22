import React from 'react';
import { Image } from 'react-konva';
import background from '../assets/background_lvl1.png';

class Background extends React.Component {
    state = {
      image: null
    }

  componentDidMount() {
    const image = new window.Image();
    image.src = background;
    image.onload = () => {
      this.setState({
        image: image
      });
    };
  }

  render() {
    return (
      <Image image={this.state.image} />
    );
  }
}

export default Background
