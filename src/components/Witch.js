import React from 'react';
import { Image } from 'react-konva';

class Witch extends React.Component {
    state = {
      image: null
    }

  componentDidMount() {
    const image = new window.Image();
    // image.src = '../../assets/static.png';
    image.src = 'https://opengameart.org/sites/default/files/styles/medium/public/mio%20static.gif'
    image.onload = () => {
      this.setState({
        image: image
      });
      console.log(image.src);
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
