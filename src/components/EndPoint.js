import React from 'react';
import { Image } from 'react-konva';
import signPost from '../assets/signpost.png';

class EndPoint extends React.Component {
    state = {
      image: null
    }

  componentDidMount() {
    const image = new window.Image();
    image.src = signPost;
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

export default EndPoint
