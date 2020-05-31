import React from 'react';
import s from './UserProfileShort.module.scss';
import { NavLink } from 'react-router-dom';
import Event from '../Lenta/Event/Event';

export const UserProfileShort = (props) => {
    return (
        <div className={s.UserProfileShort}>
            <NavLink className={s.UserProfileShort__nick} to={`/userProfile/${props.EventId}`}>{props.name}</NavLink>
        </div>
    );
};