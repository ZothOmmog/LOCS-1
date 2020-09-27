import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import style from './style.module.scss';
import { ButtonCustom } from '~/ui/atoms';

export const ButtonBlack = ({ onClick, active, className, children, ...outherProps}) => (
    <ButtonCustom 
        onClick={onClick}
        className={ClassNames(
            style['button-colored'],
            { [style['button-colored_active']]: active },
            { [style['button-colored_inactive']]: !active },
            { [className]: className }
        )}
        {...outherProps}
    >
        {children}
    </ButtonCustom>
);

ButtonBlack.propTypes = {
    onClick: PropTypes.func,
    active: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};