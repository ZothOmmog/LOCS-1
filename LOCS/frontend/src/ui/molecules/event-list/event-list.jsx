import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.scss';

export const EventList = ({ children }) => (
    <div className={style['event-list']}>
        {children}
    </div>
);

EventList.propTypes = {
    children: PropTypes.node.isRequired
};