import React from 'react';
import Tile from './Tile.js';
import style from '../containers/App.css';

const Board = props => {
  // if (props.board == props.initialBoard) {
  const splitBoard = props.board.split('');
  const splitInitialBoard = props.initialBoard.split('');

  const value = splitBoard.map((number, index) => {
    console.log (splitBoard[index].value)
    return (
      <Tile
        key={index}
        value={number}
        className={number === splitInitialBoard[index].value ? style.tileinitial : style.tile}
        handleChange={event => props.handleChange(index, event.target.value)}
      />
    );
  });
  return <div className={style.board}>{value}</div>;
};

export default Board;
