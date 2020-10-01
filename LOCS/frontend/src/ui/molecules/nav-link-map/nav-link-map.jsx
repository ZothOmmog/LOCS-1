import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import style from './style.module.scss';
import { LinkCustom } from '~/ui/atoms';

export const NavLinkMap = ({ to, active, className, ...outherProps}) => (
    <LinkCustom 
        to={to}
        className={ClassNames(
            style['nav-link-map'],
            { [className]: className }
        )}
        {...outherProps}
    >
        {active ? (
            <svg width="50" height="100" viewBox="0 0 50 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="-1.5" x2="32" y2="-1.5" transform="matrix(0 -1 -1 0 8 66)" stroke="white" stroke-width="3"/>
                <line y1="-1.5" x2="48" y2="-1.5" transform="matrix(0 -1 -1 0 16 74)" stroke="white" stroke-width="3"/>
                <line y1="-1.5" x2="64" y2="-1.5" transform="matrix(0 -1 -1 0 24 82)" stroke="white" stroke-width="3"/>
            </svg>
        ) : (
            <svg className={style['nav-link-map__svg']} width="23" height="35" viewBox="0 0 23 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className={style['nav-link-map__marker']} d="M1.70478 5.14211C-3.37393 13.0822 3.83182 27.343 11.0324 34.8384C11.0946 34.9032 11.148 34.9583 11.1887 35C11.1946 34.9635 11.2004 34.9273 11.2062 34.8907C11.2004 34.9273 11.1946 34.9635 11.1887 35C21.9595 23.7571 25.484 11.2068 21.267 5.06785C19.5141 2.51591 15.5968 -0.131295 11.1345 0.00505216C7.70287 0.110356 3.80023 1.86613 1.70478 5.14211ZM4.60401 11.0041C4.60401 7.13345 7.62805 3.99564 11.3586 3.99564C15.0889 3.99564 18.1133 7.13345 18.1133 11.0041C18.1133 14.8748 15.0892 18.0126 11.3586 18.0126C7.62805 18.0126 4.60401 14.8748 4.60401 11.0041Z" fill="white"/>
            </svg>
        )}
    </LinkCustom>
);

NavLinkMap.propTypes = {
    to: PropTypes.string.isRequired,
    active: PropTypes.bool,
    className: PropTypes.string,
};