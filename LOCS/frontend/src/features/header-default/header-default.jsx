import React from 'react';
import { useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import style from './style.module.scss';
import { Logo, Navbar, NavLinkCustom } from '~/ui/atoms';
import { NavLinkBordered, NavLinkColored, NavLinkProfile } from '~/ui/molecules';
import { FilterTagsToggle } from '~/features/filter-tags';

const paths = {
    MAIN_PATH: '/',
    LOGIN_PATH: '/login',
    REGISTRATION_PATH: '/registration',
    PROFILE_PATH: '/profile',
}

const HeaderTemplate = ({ children }) => (
    <div className={style['header-template']}>
        <div className={style['header-template__logo']}>
        {children[0]}
        </div>
        {children[1]}
        {children[2]}
        <div className={style['header-template__profile']}>
            {children[3]}
        </div>
    </div>
);

HeaderTemplate.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export const HeaderDefault = () => {
    const { pathname } = useLocation();
    // const isAuth = useSelector( (state) => state.auth.isAuth ); TODO сделать, чтобы так работало
    // const name = useSelector(myNameSelector);
    const isAuth = false;
    const name = null;

    return (
        <HeaderTemplate>
            <NavLinkCustom to={'/'} className={style['header__nav-link-custom']}>
                <Logo />
                <span className={style['header__title']}>Locs</span>
            </NavLinkCustom>
            <FilterTagsToggle />
            <input type='search' placeholder='MOCK SEARCH' />
            {isAuth ? (
                <NavLinkProfile to={paths.PROFILE_PATH} name={name} active={pathname === paths.PROFILE_PATH} />
            ) : (
                <Navbar>
                    <NavLinkColored to={paths.LOGIN_PATH} active={pathname === paths.LOGIN_PATH}>
                        Вход
                    </NavLinkColored>
                    <NavLinkBordered to={paths.REGISTRATION_PATH} active={pathname === paths.REGISTRATION_PATH}>
                        Регистрация
                    </NavLinkBordered>
                </Navbar>
            )}
        </HeaderTemplate>
    );
}