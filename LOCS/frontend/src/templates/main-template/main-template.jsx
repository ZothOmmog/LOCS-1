import React from 'react';
import style from './style.module.scss';

export const MainTemplate = ({ children }) => (
    <div className={style['main-template']}>
        {children[0]}
        <div className={style['main-template__body']}>
            <div className={style['main-template__filters']}>
                {children[1]}
            </div>
            <div className={style['main-template__content']}>
                {children[2]}
            </div>
            <div className={style['main-template__map-link']}>
                {children[3]}
            </div>
        </div>
    </div>
);