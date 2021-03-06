import React from 'react';
import style from '../containers/App.css';

const Modal = props => {
    // Render nothing if the "show" prop is false
    if (!props.show) {
        return null;
    }
    else {
        return (
            <div className={style.overlay}>
                <div className={style.modal}>
                    <h2>Wybierz poziom trudności:</h2>
                    <div className={style.buttons}>
                        <button onClick={() => props.action('easy')}>Łatwy</button>
                        <button onClick={() => props.action('medium')}>Średni</button>
                        <button onClick={() => props.action('hard')}>Trudny</button>
                        <button onClick={() => props.action('very-hard')}>Bardzo trudny</button>
                    </div>
                </div>
            </div>
        );
    }
};

export default Modal;