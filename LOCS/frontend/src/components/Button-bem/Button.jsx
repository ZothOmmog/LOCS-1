import React from 'react';
import style from './Button.module.scss';

export const Button = (props) => {
    return (
    <button 
        className={style.button}
        onClick={props.onClikHandler}
    >
        {props.buttonText}
    </button>
    )
}