import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.scss';

export const Navbar = ({ children }) => (
    <nav className={style['navbar']}>
        <ul className={style['navbar__list']}>
            {children.map((item, index) => (
                <li key={index} className={style['navbar__item']}>{item}</li>
            ))}
        </ul>
    </nav>
);

Navbar.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};
