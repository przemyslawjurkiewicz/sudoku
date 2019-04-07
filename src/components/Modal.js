import React from 'react';
import style from '../containers/App.css';

const Modal = props => {
    // Render nothing if the "show" prop is false
    if (props.show === false) {
        return null;
    }
    else {
        return (
            <div className={style.overlay}>
                <div className={style.modal}>
                    <p>Wybierz poziom trudności</p>
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