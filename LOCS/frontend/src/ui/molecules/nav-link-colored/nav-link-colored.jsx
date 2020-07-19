import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import style from './style.module.scss';
import { NavLinkCustom } from '~/ui/atoms';

export const NavLinkColored = ({ to, active, className, children, ...outherProps}) => (
    <NavLinkCustom 
        to={to}
        className={ClassNames(
            style['nav-link-colored'],
            { [style['nav-link-colored_active']]: active },
            { [style['nav-link-colored_inactive']]: !active },
            { [className]: className }
        )}
        {...outherProps}
    >
        {children}
    </NavLinkCustom>
);

NavLinkColored.propTypes = {
    to: PropTypes.string.isRequired,
    active: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};