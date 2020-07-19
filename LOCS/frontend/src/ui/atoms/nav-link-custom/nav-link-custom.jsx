import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import style from './style.module.scss';
import { Link } from 'react-router-dom';

export const NavLinkCustom = ({ to, className, children, ...outherProps}) => (
    <Link 
        to={to} 
        className={ClassNames(
            style['nav-link-custom'],
            { [className]: className }
        )}
        {...outherProps}
    >
        {children}
    </Link>
);

NavLinkCustom.propTypes = {
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};