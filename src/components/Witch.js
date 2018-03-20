import React from 'react';
import { Image } from 'react-konva';
import theWitch from '../assets/static.gif';

class Witch extends React.Component {
    state = {
      image: null
    }

  componentDidMount() {
    const image = new window.Image();
    image.src = theWitch;
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

export default Witch
