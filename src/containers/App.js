import React from 'react';
import style from './App.css';
import Result from '../components/Result';
import Board from '../components/Board';
import sudoku from 'sudoku-umd';
import { hot } from 'react-hot-loader';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialBoard: '',
      board: '',
      result: 'Zaczynamy',
      resultClassName: style.resultinitial
    };
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

  showSolve() {
    const solve = sudoku.solve(this.state.initialBoard);
    if (solve) {
      this.setState({ board: solve });
    }
  }

  checkSolve() {
    const check = sudoku.solve(this.state.board);
    if (!check) {
      alert('Nieprawidłowe rozwiązanie');
    } else if (this.state.board === this.state.initialBoard) {
      alert('Rozwiązanie jest takie samo jak początkowe');
    } else {
      alert('Gratulacje, udało Ci się :)');
    }
  }

  handleChange(index, value) {
    const newBoard =
      this.state.board.slice(0, index) +
      ((value === '') | (value < 1) | (value > 9) ? '.' : value) +
      this.state.board.slice(index + 1);
    const checkResult = sudoku.solve(newBoard);
    if (!checkResult) {
      this.setState({
        result: 'Coś jest nie tak',
        resultClassName: style.resultwrong
      });
    } else if (newBoard === this.state.initialBoard) {
      this.setState({
        result: 'Nic nie zmieniłeś',
        resultClassName: style.resultinitial
      });
    } else if (checkResult && !newBoard.includes('.')) {
      this.setState({
        result: 'Gratulacje wygrałeś',
        resultClassName: style.resultwin
      });
    } else {
      this.setState({
        result: 'Narazie wszystko dobrze :)',
        resultClassName: style.resultgood
      });
    }
    this.setState({ board: newBoard });
  }

  render() {
    return (
      <div className={style.container}>
        <h1>Sudoku</h1>
        <Result
          result={this.state.result}
          className={this.state.resultClassName}
        />
        <Board
          board={this.state.board}
          initialBoard={this.state.initialBoard}
          handleChange={this.handleChange.bind(this)}
        />
        <div className={style.buttons}>
          <button onClick={() => this.checkSolve()}>Check</button>
          <button onClick={() => this.newGame()}>New Game</button>
          <button onClick={() => this.showSolve()}>Solve</button>
          <button onClick={() => this.reset()}>Restart</button>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
