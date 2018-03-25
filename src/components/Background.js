import React from 'react';
import { Image } from 'react-konva';
import level1 from '../assets/background_lvl1.png';
import level2 from '../assets/background_lvl2.png';


class Background extends React.Component {
    constructor(props) {
      super (props);
    }
    state = {
      image: null
    }

  componentDidMount() {
    const image = new window.Image();
    // console.log(this.props.level)
    if (this.props.level === "1") {
      console.log("should load image.src level 1")
      image.src = level1;
    } else if (this.props.level === "2") {
      console.log("should load image.src level 2")
      image.src = level2;
    } else {
      console.log("danger will robinson")
    }

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
