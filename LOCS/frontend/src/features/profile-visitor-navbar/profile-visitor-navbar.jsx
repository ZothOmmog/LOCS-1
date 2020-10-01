import React from 'react';
import style from './style.module.scss';
import { ButtonCustom, NavLinkCustom } from '~/ui/atoms';
import { useDispatch } from 'react-redux';
import { authActions } from '~/redux/common-slices/auth-slice';


const ProfileVisitorNavbarView = ({ logoutCallback }) => (
    <div className={style['profile-visitor-navbar']}>
        <NavLinkCustom to='/profile/visitor/info' className={style['__item']} activeClassName={style['__item_active']}>
            Информация
        </NavLinkCustom>
        <NavLinkCustom to='/profile/visitor/subscribes' className={style['__item']} activeClassName={style['__item_active']}>
            Подписки
        </NavLinkCustom>
        <ButtonCustom to='/profile/visitor/friends' className={style['__item']}>
            Друзья
        </ButtonCustom>
        <ButtonCustom className={style['__exit']} onClick={logoutCallback}>
            Выход
        </ButtonCustom>
    </div>
);

export const ProfileVisitorNavbar = () => {
    const dispatch = useDispatch();
    const logoutCallback = () => dispatch(authActions.logout());

    return (
        <ProfileVisitorNavbarView logoutCallback={logoutCallback} />
    );
}