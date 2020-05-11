import React from 'react';
import s from './Button.module.scss';

export const Button = (props) => {
    let type = s.Button;

    type += (
        props.style === 'Switch' ? (' ' + s.Button_Style_Switch) :
        props.style === 'SwitchActive' ? (' ' + s.Button_Style_SwitchActive) : (' ' + s.Button_Style_Base)
    );

    type += (
        props.size === 'FullContainer' ? (' ' + s.Button_Size_FullContainer) : (' ' + s.Button_Size_Base)
    );

    return (
        <button
            className={type}
            onClick={props.onClickHandler}
        >
            {props.buttonText}
        </button>
    )
}