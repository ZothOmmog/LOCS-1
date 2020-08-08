import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './style.scss';
import { ButtonCustom } from '~/ui/atoms';

export const ButtonGray = ({ onClick, active, className, children, ...outherProps}) => (
    <ButtonCustom 
        onClick={onClick}
        className={ClassNames(
            'button-gray',
            { 'button-gray_active': active },
            { 'button-gray_inactive': !active },
            { [className]: className }
        )}
        {...outherProps}
    >
        {children}
    </ButtonCustom>
);

ButtonGray.propTypes = {
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};