import React from 'react';
import s from './OrganizerProfileShort.module.scss';
import { NavLink } from 'react-router-dom';

export const OrganizerProfileShort = (props) => {
    const imgUrl = 'https://bit.ly/2AVRWfX';
    return (
        <div className={s.UserProfileShort}>
            <div className={s.UserProfileShortPicture}>
                { props.img && props.img !== '1' ? 
                    <img src={props.img} alt="Аватарка пользователя" className={s.UserProfileShortPicture__Img} /> : 
                    <img src={imgUrl} alt="Аватарка пользователя" className={s.UserProfileShortPicture__Img} /> 
                }
            </div>
            <NavLink className={s.UserProfileShort__nick} to={`/userProfile/${props.userId}/Organizer`}>{props.nick}</NavLink>
        </div>
    );
};