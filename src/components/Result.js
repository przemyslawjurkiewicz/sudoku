import React from 'react';
import style from '../containers/App.css';

const result = props => {
    return (
        <p className={props.className}>{props.result}</p>
    );
};

export default result;