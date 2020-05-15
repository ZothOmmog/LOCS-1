import React from 'react';
import s from './UserProfileShort.module.scss';
import { NavLink } from 'react-router-dom';

export const UserProfileShort = (props) => {
    const imgUrl = 'https://im0-tub-ru.yandex.net/i?id=bc7f9021eae00edbac26dc53c0e013c4&n=13';
    return (
        <div className={s.UserProfileShort}>
            <div className={s.UserProfileShortPicture}>
                { props.img ? 
                    <img src={props.img} alt="Аватарка пользователя" className={s.UserProfileShortPicture__Img} /> : 
                    <img src={imgUrl} alt="Аватарка пользователя" className={s.UserProfileShortPicture__Img} /> 
                }
            </div>
            <NavLink className={s.UserProfileShort__nick} to={`/userProfile/${props.userId}`}>{props.nick}</NavLink>
        </div>
    );
};