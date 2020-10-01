import React from 'react';
import { HeaderDefault } from '~/features/header-default';
import { ProfileToggle } from '~/features/profile-toggle';
import { NavLinkMap } from '~/ui';
import style from './style.module.scss';

export const ProfileTemplate = ({ children }) => (
    <div className={style['profile-visitor-info-template']}>
        <div className={style['__main-header']}>
            <HeaderDefault />
        </div>
        <div className={style['__body']}>
            <div className={style['__main']}>
                <div className={style['__header']}>
                    <div className={style['__main-info']}>
                        {children[0]}
                    </div>
                    <div className={style['__toggle-link']}>
                        <ProfileToggle />
                    </div>
                </div>
                {children[1]}
                {children[2]}
                {children[3]}
            </div>
        </div>
        <div className={style['__map-link']}>
            <NavLinkMap to='/map' />
        </div>
    </div>
);