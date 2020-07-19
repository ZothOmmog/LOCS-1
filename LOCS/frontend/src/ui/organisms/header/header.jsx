import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.scss';
import { Logo, Navbar, NavLinkCustom } from '~/ui/atoms';
import { NavLinkBordered, NavLinkColored, NavLinkProfile } from '~/ui/molecules';

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

//TODO надо переделать, вместо навбара будет часть фичи выбора тегов
//TODO добавить форму поиска из фичи поиска вместо заглушки, в самой форме реализовать проп active, чтобы пользователь понимал, что он на странице поиска
export const Header = ({ isAuth, name, path }) => (
    <HeaderTemplate>
        <NavLinkCustom to={'/'} className={style['header__nav-link-custom']}>
            <Logo />
            <span className={style['header__title']}>Locs</span>
        </NavLinkCustom>
        <Navbar>
            <NavLinkBordered to={paths.MAIN_PATH} active={path === paths.MAIN_PATH}>
                Все события
            </NavLinkBordered>
            <NavLinkBordered to={paths.MAIN_PATH}>
                Концерты
            </NavLinkBordered>
            <NavLinkBordered to={paths.MAIN_PATH}>
                Театр
            </NavLinkBordered>
            <NavLinkBordered to={paths.MAIN_PATH}>
                Ещё
            </NavLinkBordered>
        </Navbar>
        <input type='search' placeholder='MOCK SEARCH' />
        {isAuth ? (
            <NavLinkProfile to={paths.PROFILE_PATH} name={name} active={path === paths.PROFILE_PATH} />
        ) : (
            <Navbar>
                <NavLinkColored to={paths.LOGIN_PATH} active={path === paths.LOGIN_PATH}>
                    Вход
                </NavLinkColored>
                <NavLinkBordered to={paths.REGISTRATION_PATH} active={path === paths.REGISTRATION_PATH}>
                    Регистрация
                </NavLinkBordered>
            </Navbar>
        )}
    </HeaderTemplate>
);

Header.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    name: PropTypes.string,
    path: PropTypes.oneOf( Object.values(paths) ).isRequired,
};