import React from 'react';
import style from '../containers/App.css';

const Tile = props => {
  return (
    <input
      type="number"
      min="1"
      max="9"
      value = {props.value}
      onChange={props.handleChange}
      className={props.className}
    />
  );
};

export default Tile;
