import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import style from './style.module.scss';

export const ButtonCustom = ({ onClick, className, children, ...outherProps}) => (
    <button 
        onClick={onClick} 
        className={ClassNames(
            style['button-custom'],
            { [className]: className }
        )}
        {...outherProps}
    >
        {children}
    </button>
);

ButtonCustom.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};