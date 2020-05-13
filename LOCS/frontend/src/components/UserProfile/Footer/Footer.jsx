import React from 'react';
import s from './Footer.module.scss';
import { Button } from '../../Button-bem/Button';
import { NavButton } from '../../NavButton/NavButton';

export const Footer = (props) => {
    return (
        <div className={s.UserProfileFooter}>
            <div className={s.UserProfileFooter__Item}>
                <NavButton style={{
                    buttonText: 'Профиль',
                    type: `ProfileFooter${props.route.typeContent === 'me' ? 'Active' : ''}`,
                    size: 'FullContainer',
                    path: '/UserProfile/me'
                }} />
            </div>
            <div className={s.UserProfileFooter__Item}>
                <NavButton style={{
                    buttonText: 'Друзья',
                    type: `ProfileFooter${props.route.typeContent === 'Friends' ? 'Active' : ''}`,
                    size: 'FullContainer',
                    path: '/UserProfile/me/Friends'
                }} />
            </div>
            <div className={s.UserProfileFooter__Item}>
                <NavButton style={{
                    buttonText: 'Входящие заявки в друзья',
                    type: `ProfileFooter${props.route.typeContent === 'FriendRequestsIn' ? 'Active' : ''}`,
                    size: 'FullContainer',
                    path: '/UserProfile/me/FriendRequestsIn'
                }} />
            </div>
            <div className={s.UserProfileFooter__Item}>
                <NavButton style={{
                    buttonText: 'Исходящие заявки в друзья',
                    type: `ProfileFooter${props.route.typeContent === 'FriendRequestsOut' ? 'Active' : ''}`,
                    size: 'FullContainer',
                    path: '/UserProfile/me/FriendRequestsOut'
                }} />
            </div>
            <div className={s.UserProfileFooter__Item}>
                <NavButton style={{
                    buttonText: 'Поиск людей',
                    type: `ProfileFooter${props.route.typeContent === 'SearchUsers' ? 'Active' : ''}`,
                    size: 'FullContainer',
                    path: '/UserProfile/me/SearchUsers'
                }} />
            </div>
            <div className={s.UserProfileFooter__Item}>
                <Button style={{
                    buttonText: 'Выход',
                    type: 'ProfileExit',
                    size: 'FullContainer',
                    onClickHandler: props.logoutMe
                }} />
            </div>
        </div>
    );
}