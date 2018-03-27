import React from 'react';
import { Image } from 'react-konva';
import enemy from '../assets/enemy.png';

class Enemy extends React.Component {
    state = {
      image: null
    }

  componentDidMount() {
    const image = new window.Image();
    image.src = enemy;
    image.onload = () => {
      this.setState({
        image: image
      });
    };
  }

  render() {
    return (
      <Image image={this.state.image} x={this.props.x}
      y={this.props.y} />
    );
  }
}

export default Enemy
