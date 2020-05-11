import React from 'react';
import s from './PagesNumbersMenu.module.scss';
import '../CommonStyles/Button/Button.css';
import { Button } from '../indexComponents.js';

export const PagesNumbersMenu = (props) => {
    const pages = props.pages.map((page, index) => +page !== +props.currentPage ?
        <Button buttonText={page} style='Switch' onClickHandler={props.changeCurrentPage} /> :
        <Button buttonText={page} style='SwitchActive' />
    );

    return (
        <div className={s.PagesNumbersMenu}>
            {pages}
        </div>
    );
};