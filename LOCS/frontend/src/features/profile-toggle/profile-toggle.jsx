import React from 'react';
import style from './style.module.scss';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { NavLinkCustom } from '~/ui/atoms';
import { useSelector } from 'react-redux';
import { authSelectors } from '~/redux/common-slices/auth-slice';
import { NavLinkColoredLocs } from '~/ui/molecules';

export const ProfileToggle = () => {
    const { pathname } = useLocation();
    const isOrganizer = useSelector(authSelectors.isOrganizerSelector);

    return isOrganizer ? (
        <div className={style['profile-toggle']}>
            <NavLinkCustom
                to='/profile/visitor/info'
                className={classNames([style['__item'], { [style['_active']]: pathname.includes('profile/visitor') }])}
            >
                Посетитель
            </NavLinkCustom>
            <NavLinkCustom
                to='/profile/organizer/info'
                className={classNames([style['__item'], { [style['_active']]: pathname.includes('profile/organizer') }])}
            >
                Организатор
            </NavLinkCustom>
        </div>
    ) : <NavLinkColoredLocs to='/profile/organizer/registration'>Регистрация аккаута организатора</NavLinkColoredLocs>;
};