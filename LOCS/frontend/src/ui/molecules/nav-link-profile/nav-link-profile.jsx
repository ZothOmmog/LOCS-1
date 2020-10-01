import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import style from './style.module.scss';
import imgDefault from './img-default.jpg';
import { LinkCustom } from '~/ui/atoms';

export const NavLinkProfile = ({ to, name, imgPath, active }) => (
    <LinkCustom to={to}>
        <div className={ClassNames(
            style['nav-link-profile'],
            { [style['nav-link-profile_active']]: active }
        )}>
            <div className={ClassNames(
                style['nav-link-profile__name'],
            )}>
                {name}
            </div>
            <img 
                className={style['nav-link-profile__img']} 
                src={imgPath || imgDefault} 
                alt='Изображение профиля'
            />
        </div>
    </LinkCustom>
);

NavLinkProfile.propTypes = {
    to: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imgPath: PropTypes.string
};