import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import style from './nav-link-colored-locs.module.scss';
import { NavLinkCustom } from '~/ui/atoms';

export const NavLinkColoredLocs = ({ to, className, children, ...outherProps}) => (console.error('Компонент NavLinkColored устарел, надо заменить его на NavLinkColoredLocs'),
    <NavLinkCustom 
        to={to}
        className={ClassNames(style['_'], { [className]: className })}
        activeClassName={style['_active']}
        {...outherProps}
    >
        {children}
    </NavLinkCustom>
);

NavLinkColoredLocs.propTypes = {
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};