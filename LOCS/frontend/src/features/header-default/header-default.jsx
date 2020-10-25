import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import style from './style.module.scss';
import { Logo, Navbar, LinkCustom } from '~/ui/atoms';
import { NavLinkProfile } from '~/ui/molecules';
import { ToggleTagsMenu } from '~/features/toggle-tags-menu';
import { Login } from '../login';
import { authSelectors } from '~/redux/common-slices/auth-slice';
import { Registration } from '../registration/registration';

const paths = {
    MAIN_PATH: '/',
    LOGIN_PATH: '/login',
    REGISTRATION_PATH: '/registration',
    PROFILE_PATH: '/profile/visitor/info',
    PROFILE_PATH_FOR_ACTIVE: '/profile',
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
    const name = useSelector(authSelectors.visitorNickSelector);
    const urlPicture = useSelector(authSelectors.visitorUrlPictureSelector);

    return (
        <HeaderTemplate>
            <LinkCustom to={'/'} className={style['header__link-custom']}>
                <Logo />
                <span className={style['header__title']}>Locs</span>
            </LinkCustom>
            <ToggleTagsMenu />
            <input type='search' placeholder='MOCK SEARCH' />
            {isAuth ? (
                <NavLinkProfile to={paths.PROFILE_PATH} name={name} active={pathname.includes(paths.PROFILE_PATH_FOR_ACTIVE)} />
            ) : (
                <Navbar>
                    <>
                        {isAuth ? (
                            <NavLinkProfile to={paths.PROFILE_PATH} imgPath={urlPicture} name={name} />
                        ): <Login />}
                    </>
                    <Registration />
                </Navbar>
            )}
        </HeaderTemplate>
    );
}