import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import style from './style.module.scss';

export const ButtonCustom = ({ onClick, className, children, buttonRef, ...outherProps }) => (
    <button 
        onClick={onClick} 
        className={ClassNames(
            style['button-custom'],
            { [className]: className }
        )}
        {...outherProps}
        ref={buttonRef}
    >
        {children}
    </button>
);

ButtonCustom.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    buttonRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    children: PropTypes.node.isRequired
};