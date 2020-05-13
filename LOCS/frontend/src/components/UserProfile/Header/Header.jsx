import React from 'react';
import s from './Header.module.scss';
import { NavButton } from '../../NavButton/NavButton';

export const Header = () => {
    return (
        <div className={s.UserProfileHeader}>
            <div className={s.UserProfileHeader__Item}>
                <NavButton style={{
                    buttonText: 'Посетитель',
                    type: 'ProfileHeaderActive',
                    size: 'FullContainer',
                    path: '/UserProfile/me'
                }} />
            </div>
            <div className={s.UserProfileHeader__Item}>
                <NavButton style={{
                    buttonText: 'Организатор',
                    type: 'ProfileHeader',
                    size: 'FullContainer',
                    path: '/UserProfile/me/Organizer'
                }} />
            </div>
        </div>
    );
}
