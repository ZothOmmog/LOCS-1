import React from 'react';
import s from './PagesNumbersMenu.module.scss';
import '../CommonStyles/Button/Button.css';
import { Button } from '../indexComponents.js';

export const PagesNumbersMenu = (props) => {
    const styleButtonSwitch = {
        type: 'Switch',
        onClickHandler: props.changeCurrentPage
    };
    const styleButtonSwitchActive = {
        type: 'SwitchActive'
    };

    const pages = props.pages.map((page, index) => +page !== +props.currentPage ?
        <div className={s.PagesNumbersMenu__Item}>
            <Button key={index} style={{ ...styleButtonSwitch, buttonText: page }} />
        </div> :
        <div className={s.PagesNumbersMenu__Item}>
            <Button key={index} style={{ ...styleButtonSwitchActive, buttonText: page }} />
        </div>
    );

    return (
        <div className={s.PagesNumbersMenu}>
            {pages}
        </div>
    );
};