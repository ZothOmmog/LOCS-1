import React from 'react';
import { ProfileVisitorTemplate } from '../profile-visitor-template';
import style from './profile-organizer-registration-template.module.scss';

export const ProfileOrganizerRegistrationTemplate = ({ children }) => (
    <ProfileVisitorTemplate>
        <div className={style['_']}>
            {children}
        </div>
    </ProfileVisitorTemplate>
);