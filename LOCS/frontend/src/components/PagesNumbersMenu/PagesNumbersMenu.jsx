import React from 'react';
import s from './PagesNumbersMenu.module.scss';
import '../CommonStyles/Button/Button.css';


export const PagesNumbersMenu = (props) => {
    
    const pages = props.pages.map((page) => +page !== +props.currentPage ?
        <div 
            className={'button ' + s.PagesNumbersMenu__item}
            onClick={props.changeCurrentPage}
        >
            {page}
        </div> :
        <div className={'button ' + s.PagesNumbersMenu__item + ' ' + s.PagesNumbersMenu__item_active}>
            {page}
        </div>
    );

    return (
        <div className={s.PagesNumbersMenu}>
            {pages}
        </div>
    );
};