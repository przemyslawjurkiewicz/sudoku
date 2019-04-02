import React from 'react';
import Tile from './Tile.js';
import style from '../containers/App.css';

const Board = props => {
  // if (props.board == props.initialBoard) {
  const splitBoard = props.board.split('');
  const splitInitialBoard = props.initialBoard.split('');

  const value = splitBoard.map((number, index) => {
    //console.log (props.board[index])
    return (
      <Tile
        key={index}
        value={number === '.' ? '' : number}
        className={
          number === splitInitialBoard[index] ? style.tileinitial : style.tile
        }
        disabled={
          number == '.' ? false : true
        }
        handleChange={event => props.handleChange(index, event.target.value)}
      />
    );
  });
  return <div className={style.board}>{value}</div>;
};

export default Board;
