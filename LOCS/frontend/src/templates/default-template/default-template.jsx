import React from 'react';
import { HeaderDefault } from '~/features/header-default';
import { NavLinkMap } from '~/ui';
import style from './style.module.scss';

export const DefaultTemplate = ({ children }) => (
    <div className={style['default-template']}>
        <HeaderDefault />
        <div className={style['default-template__body']}>
            {children}
            <div className={style['default-template__map-link']}>
                <NavLinkMap to='/map' />
            </div>
        </div>
    </div>
);