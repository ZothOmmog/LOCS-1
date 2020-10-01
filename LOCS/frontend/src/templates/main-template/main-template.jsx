import React from 'react';
import style from './style.module.scss';
import { DefaultTemplate } from '../default-template';

export const MainTemplate = ({ children }) => (
    <DefaultTemplate>
        <>
            <div className={style['main-template__filters']}>
                {children[0]}
            </div>
            <div className={style['main-template__content']}>
                {children[1]}
            </div>
        </>
    </DefaultTemplate>
);