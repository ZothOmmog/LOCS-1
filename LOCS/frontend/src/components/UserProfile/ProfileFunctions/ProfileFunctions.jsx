import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './ProfileFunctions.module.scss';

export const ProfileFunctions = (props) => {
    return (
        <div className={s.ProfileFunctions}>
            <h2 className={s.ProfileFunctions__Title} >Функции профиля</h2>
            <NavLink className={s.ProfileFunctions__Item} to='/userProfile/me/SearchUsers'>
                Поиск пользователей
            </NavLink>
        
            <NavLink className={s.ProfileFunctions__Item} to='/userProfile/me/FriendRequestIn'>
                Входящие заявки в друзья
            </NavLink>
        
            <NavLink className={s.ProfileFunctions__Item} to='/userProfile/me/FriendRequestOut'>
                Исходящие заявки в друзья
            </NavLink>
        </div>
    )
}