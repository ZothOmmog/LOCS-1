import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import style from './style.module.scss';
import { ButtonCustom } from '~/ui/atoms';

export const ButtonBordered = ({ onClick, active, className, children, ...outherProps}) => (
    <ButtonCustom 
        onClick={onClick}
        className={ClassNames(
            style['button-bordered'],
            { [style['button-bordered_active']]: active },
            { [style['button-bordered_inactive']]: !active },
            { [className]: className }
        )}
        {...outherProps}
    >
        {children}
    </ButtonCustom>
);

ButtonBordered.propTypes = {
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};