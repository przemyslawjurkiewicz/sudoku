import React from 'react';
import style from './App.css';
import Result from '../components/Result';
import Board from '../components/Board';
import Modal from '../components/Modal';
import sudoku from 'sudoku-umd';
import { hot } from 'react-hot-loader';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialBoard: '',
      board: '',
      result: 'Zaczynamy',
      resultClassName: style.resultinitial,
      modalIsOpen: false
    };
  }

  toggleModal (){
    this.setState({
      modalIsOpen: !this.state.modalIsOpen     
    });
    console.log(this.state.modalIsOpen)
  }

  newGame(difficult) {
    const board = sudoku.generate(difficult);
    this.setState({
      initialBoard: board,
      board,
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  reset() {
    this.setState({ board: this.state.initialBoard, result: 'Zaczynamy' });
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
        <h1>SUDOKU</h1>
        <Result
          result={this.state.result}
          className={this.state.resultClassName}
        />
        <Board
          board={this.state.board}
          initialBoard={this.state.initialBoard}
          handleChange={this.handleChange.bind(this)}
        />
        <Modal 
          show={this.state.modalIsOpen}
          action = {this.newGame.bind(this)}
        />
        <div className={style.buttons} >
          <button onClick={() => this.toggleModal()}>Nowa gra</button>
          <button onClick={() => this.showSolve()}>Pokaż rozwiązanie</button>
          <button onClick={() => this.reset()}>Restart</button>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
