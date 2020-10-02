import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import style from './style.module.scss';
import { Link } from 'react-router-dom';

export const LinkCustom = ({ to, className, children, ...outherProps}) => (
    <Link 
        to={to} 
        className={ClassNames(
            style['link-custom'],
            { [className]: className }
        )}
        {...outherProps}
    >
        {children}
    </Link>
);

LinkCustom.propTypes = {
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};