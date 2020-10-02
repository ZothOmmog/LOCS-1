import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import style from './style.module.scss';
import { LinkCustom } from '~/ui/atoms';

export const NavLinkBordered = ({ to, active, className, children, ...outherProps}) => (
    <LinkCustom 
        to={to}
        className={ClassNames(
            style['nav-link-bordered'],
            { [style['nav-link-bordered_active']]: active },
            { [style['nav-link-bordered_inactive']]: !active },
            { [className]: className }
        )}
        {...outherProps}
    >
        {children}
    </LinkCustom>
);

NavLinkBordered.propTypes = {
    to: PropTypes.string.isRequired,
    active: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};