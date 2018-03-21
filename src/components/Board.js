import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGame } from '../store/settingBoard';

class Board extends Component {
  constructor() {
    super();

    this.state = {
      //difficulty: 'easy',
    };

    this.onCreateGame = this.onCreateGame.bind(this);
    
  }

  componentDidMount() {
    this.onCreateGame(this.state.difficulty);
  }

  onCreateGame() {
    this.props.createGame(9, 9);
  }


  render() {
    console.log("props",this.props);
    const boardValues = this.props.boardValues;
    return (

      <div >
        {
          boardValues.map(value => (
            <div>
              <div>{value}</div>
            </div>
          ))
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    boardValues: state.settingBoard.boardValues,
    //status: state.settingBoard.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createGame: (numRows, numCols) => {
      dispatch(createGame(numRows, numCols));
    }
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Board);


