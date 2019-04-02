import React from 'react';
import style from './App.css';
import Board from '../components/Board';
import sudoku from 'sudoku-umd';
import { hot } from 'react-hot-loader';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialBoard: '',
      board: ''
    };
    this.newGame = this.newGame.bind(this);
    this.reset = this.reset.bind(this);
  }

  newGame() {
    const board = sudoku.generate('easy');
    this.setState({
      initialBoard: board,
      board
    });
  }

  reset() {
    this.setState({ board: this.state.initialBoard });
  }

  handleChange(index, value) {
    console.log(index, value);
    const newBoard =
      this.state.board.slice(0, index) +
      ((value === '') | (value < 1) | (value > 9) ? '.' : value) +
      this.state.board.slice(index + 1);
    console.log(this.state.board, newBoard);
    this.setState({ board: newBoard });
  }

  render() {
    return (
      <div className={style.container}>
        <h1>Sudoku</h1>
        <Board
          board={this.state.board}
          initialBoard={this.state.initialBoard}
          handleChange={this.handleChange.bind(this)}
        />
        <div className={style.buttons}>
          <button>Check</button>
          <button onClick={this.newGame}>New Game</button>
          <button>Solve</button>
          <button onClick={this.reset}>Restart</button>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
