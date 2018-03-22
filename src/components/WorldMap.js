import React from 'react';
import { Image } from 'react-konva';
import theWorld from '../assets/world_map2.png';

class WorldMap extends React.Component {
    state = {
      image: null
    }

  componentDidMount() {
    const image = new window.Image();
    image.src = theWorld;
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

export default WorldMap
