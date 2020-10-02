import React from 'react';
import { ProfileOrganizerTemplate } from '../profile-organizer-template/profile-organizer-template';
import style from './style.module.scss';

export const ProfileOrganizerEventsCreateTemplate = ({ children }) => (
    <ProfileOrganizerTemplate>
        <div className={style['events-create']}>
            {children}
        </div>
    </ProfileOrganizerTemplate>
);