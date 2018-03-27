import React from 'react';
import { Image } from 'react-konva';
import item from '../assets/item.png';

class Item extends React.Component {
    state = {
      image: null
    }

  componentDidMount() {
    const image = new window.Image();
    image.src = item;
    image.onload = () => {
      this.setState({
        image: image
      });
    };
  }

  render() {
    return (
      <Image image={this.state.image} x={this.props.x}
      y={this.props.y} onClick={this.handleClick}/>
    );
  }
}

export default Item
