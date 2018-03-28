import React from 'react';
import { Image } from 'react-konva';

import level1 from '../assets/background_lvl1.png';
import level2 from '../assets/background_lvl2.png';
import level3 from '../assets/background_lvl3.png';
import level4 from '../assets/background_lvl4.png';
import level5 from '../assets/background_lvl5.png';

class Background extends React.Component {
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
    } else if (this.props.level === "3") {
      console.log("should load image.src level 3")
      image.src = level3;
    } else if (this.props.level === "4") {
      console.log("should load image.src level 4")
      image.src = level4;
    } else if (this.props.level === "5") {
      console.log("should load image.src level 5")
      image.src = level5;
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
