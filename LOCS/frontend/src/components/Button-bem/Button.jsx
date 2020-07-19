import React from 'react';
import s from './Button.module.scss';

export const Button = ({ style: { type, size, onClickHandler, buttonText }, typeButton, disabled }) => {
    let typeStyle = s.Button;

    typeStyle += (
        type === 'Switch' ? (' ' + s.Button_Style_Switch) :
        type === 'SwitchActive' ? (' ' + s.Button_Style_SwitchActive) :
        type === 'NotBorderRadius' ? (' ' + s.Button_Style_NotBorderRadius) :
        type === 'NotBorderRadiusRed' ? (' ' + s.Button_Style_NotBorderRadiusRed) :
        type === 'Search' ? (' ' + s.Button_Style_Search) :
        type === 'ProfileExit' ? (' ' + s.Button_Style_ProfileExit) : (' ' + s.Button_Style_Base)
    );

    typeStyle += (
        size === 'FullContainer' ? (' ' + s.Button_Size_FullContainer) : (' ' + s.Button_Size_Base)
    );

    return (
        <button
            className={typeStyle}
            onClick={onClickHandler}
            type={typeButton}
            disabled={disabled}
        >
            {buttonText}
        </button>
    )
}