import React from 'react';
import { Image } from 'react-konva';
import theArrow from '../assets/giphy.gif';
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
  }

  componentDidMount() {
    console.log(this.state.levelNumber);
    const image = new window.Image();
    image.src = theArrow;
    image.onload = () => {
      this.setState({
        image: image
      });
    };
    if (this.state.levelNumber === 1) {
      this.setState ({
        xCoord: 32,
        yCoord: 2
      })
    } else if (this.state.levelNumber === 2) {
      console.log("two ", this.state.levelNumber)
      this.setState ({
        xCoord: 356,
        yCoord: 475
      })
    } else if (this.state.levelNumber === 3) {
      this.setState ({
        xCoord: 575,
        yCoord: 190
      })
    } else if (this.state.levelNumber === 4) {
      this.setState ({
        xCoord: 990,
        yCoord: 320
      })
      console.log(this.state.xCoord);
    } else if (this.state.levelNumber === 5) {
      this.setState ({
        xCoord: 1215,
        yCoord: 98
      })
    }
  }

  render() {
    return (
      <Image image={this.state.image} width={30} height={30} x={this.state.xCoord} y={this.state.yCoord} level={this.state.levelNumber} onClick={(evt) => this.handleClick(evt, this.state.levelNumber)}/>
    );
  }
}

export default LevelPointer
