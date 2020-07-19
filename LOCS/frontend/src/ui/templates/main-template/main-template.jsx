import React from 'react';
import style from './style.module.scss';
import { DefaultTemplate } from '../default-template';

export const MainTemplate = ({ children }) => (
    <DefaultTemplate>
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
    </DefaultTemplate>
);