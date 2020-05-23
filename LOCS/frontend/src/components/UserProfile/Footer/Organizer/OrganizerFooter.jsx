import React from 'react';
import s from './OrganizerFooter.module.scss';
import { Button } from '../../../Button-bem/Button';
import { NavButton } from '../../../NavButton/NavButton';

export const OrganizerFooter = (props) => {
    return (
        <div className={s.UserProfileFooter}>
            <div className={s.UserProfileFooter__Item}>
                <NavButton style={{
                    buttonText: 'Профиль',
                    type: `ProfileFooter${props.route.typeContent === 'Organizer' ? 'Active' : ''}`,
                    size: 'FullContainer',
                    path: '/UserProfile/me/Organizer'
                }} />
            </div>
            <div className={s.UserProfileFooter__Item}>
                <NavButton style={{
                    buttonText: 'Подписчики',
                    type: `ProfileFooter${props.route.typeContent === 'Subscribers' ? 'Active' : ''}`,
                    size: 'FullContainer',
                    path: '/UserProfile/me/Organizer/Subscribers'
                }} />
            </div>
            <div className={s.UserProfileFooter__Item}>
                <NavButton style={{
                    buttonText: 'Организуемые мероприятия',
                    type: `ProfileFooter${props.route.typeContent === 'Events' ? 'Active' : ''}`,
                    size: 'FullContainer',
                    path: '/UserProfile/me/Organizer/Events'
                }} />
            </div>
            <div className={s.UserProfileFooter__Item}>
                <NavButton style={{
                    buttonText: 'Добавить мероприятие',
                    type: `ProfileFooter${props.route.typeContent === 'AddEvent' ? 'Active' : ''}`,
                    size: 'FullContainer',
                    path: '/UserProfile/me/Organizer/AddEvent'
                }} />
            </div>
            <div className={s.UserProfileFooter__Item}>
                <Button style={{
                    buttonText: 'Выход',
                    type: 'ProfileExit',
                    size: 'FullContainer',
                    onClickHandler: props.logoutMeThunk
                }} />
            </div>
        </div>
    );
}