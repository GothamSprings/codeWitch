import React from 'react';
import { Image } from 'react-konva';
import theArrow from '../assets/giphy.gif';
import level1 from '../assets/level1.png'
import level2 from '../assets/level2.png'
import level3 from '../assets/level3.png'
import level4 from '../assets/level4.png'
import level5 from '../assets/level5.png'


import history from '../history';


class LevelPointer extends React.Component {
  state = {
    image: null,
    xCoord: 32,
    yCoord: 2,
    level: this.props.userDetail,
    levelNumber: this.props.levelNumber
  };

  handleClick = (evt, level) => {
    history.push({
      pathname: `/level/${level}`,
      state: { type: this.props.gameType }
    })
    this.props.setLevelMap(level);
  }

  componentDidMount() {
    console.log(this.state.levelNumber);
    const image = new window.Image();
      if (this.state.levelNumber === 1) {
        image.src = level1;
        image.onload = () => {
          this.setState({
            image: image
          });
        };
      this.setState ({
        xCoord: 2,
        yCoord: 98
      })
    } else if (this.state.levelNumber === 2) {
      image.src = level2;
      image.onload = () => {
        this.setState({
          image: image
        });
      };
      this.setState ({
        xCoord: 319,
        yCoord: 578
      })
    } else if (this.state.levelNumber === 3) {
      image.src = level3;
      image.onload = () => {
        this.setState({
          image: image
        });
      };
      this.setState ({
        xCoord: 545,
        yCoord: 290
      })
    } else if (this.state.levelNumber === 4) {
      image.src = level4;
      image.onload = () => {
        this.setState({
          image: image
        });
      };
      this.setState ({
        xCoord: 895,
        yCoord: 580
      })
    } else if (this.state.levelNumber === 5) {
      image.src = level5;
      image.onload = () => {
        this.setState({
          image: image
        });
      };
      this.setState ({
        xCoord: 1183,
        yCoord: 195
      })
    }
  }

  render() {
    return (
      <Image image={this.state.image} width={95} height={24.5} x={this.state.xCoord} y={this.state.yCoord} level={this.state.levelNumber} onClick={(evt) => this.handleClick(evt, this.state.levelNumber)}/>
    );
  }
}

export default LevelPointer
