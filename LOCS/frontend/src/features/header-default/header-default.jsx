import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import style from './style.module.scss';
import { Logo, Navbar, LinkCustom } from '~/ui/atoms';
import { NavLinkBordered, NavLinkProfile } from '~/ui/molecules';
import { ToggleTagsMenu } from '~/features/toggle-tags-menu';
import { Login } from '../login';
import { authSelectors } from '~/redux/common-slices/auth-slice';

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
    const isAuth = useSelector(authSelectors.isAuthSelector);
    const name = useSelector(authSelectors.userNickSelector);
    const urlPicture = useSelector(authSelectors.userUrlPictureSelector);

    return (
        <HeaderTemplate>
            <LinkCustom to={'/'} className={style['header__link-custom']}>
                <Logo />
                <span className={style['header__title']}>Locs</span>
            </LinkCustom>
            <ToggleTagsMenu />
            <input type='search' placeholder='MOCK SEARCH' />
            {isAuth ? (
                <NavLinkProfile to={paths.PROFILE_PATH} name={name} active={pathname === paths.PROFILE_PATH} />
            ) : (
                <Navbar>
                    <>
                        {isAuth ? (
                            <NavLinkProfile imgPath={urlPicture} name={name} />
                        ): <Login />}
                    </>
                    <NavLinkBordered to={paths.REGISTRATION_PATH} active={pathname === paths.REGISTRATION_PATH}>
                        Регистрация
                    </NavLinkBordered>
                </Navbar>
            )}
        </HeaderTemplate>
    );
}