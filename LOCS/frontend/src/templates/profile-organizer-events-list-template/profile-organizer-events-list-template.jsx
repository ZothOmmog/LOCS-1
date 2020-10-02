import React from 'react';
import { ProfileOrganizerTemplate } from '../profile-organizer-template/profile-organizer-template';
import style from './style.module.scss';

export const ProfileOrganizerEventsListTemplate = ({ children }) => (
    <ProfileOrganizerTemplate>
        <div className={style['__list']}>
            {children}
        </div>
    </ProfileOrganizerTemplate>
);