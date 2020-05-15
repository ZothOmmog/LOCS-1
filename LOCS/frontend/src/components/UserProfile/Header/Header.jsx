import React from 'react';
import s from './Header.module.scss';
import { NavButton } from '../../NavButton/NavButton';

export const Header = (props) => {
    return (
        <div className={s.UserProfileHeader}>
            <div className={s.UserProfileHeader__Item}>
                <NavButton style={{
                    buttonText: 'Посетитель',
                    type: `ProfileHeader${props.route.typeContent !== 'Organizer' ? 'Active' : ''}`,
                    size: 'FullContainer',
                    path: '/UserProfile/me'
                }} />
            </div>
            <div className={s.UserProfileHeader__Item}>
                <NavButton style={{
                    buttonText: 'Организатор',
                    type: `ProfileHeader${props.route.typeContent === 'Organizer' ? 'Active' : ''}`,
                    size: 'FullContainer',
                    path: '/UserProfile/me/Organizer'
                }} />
            </div>
        </div>
    );
}
