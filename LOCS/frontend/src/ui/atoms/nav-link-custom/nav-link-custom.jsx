import React from 'react';
import ClassNames from 'classnames';
import style from './style.module.scss';
import { NavLink } from 'react-router-dom';

export const NavLinkCustom = ({ to, className, children, activeClassName, ...outherProps}) => (
    <NavLink 
        exact to={to} 
        className={ClassNames(
            style['link-custom'],
            { [className]: className }
        )}
        activeClassName={activeClassName}
        {...outherProps}
    >
        {children}
    </NavLink>
);
