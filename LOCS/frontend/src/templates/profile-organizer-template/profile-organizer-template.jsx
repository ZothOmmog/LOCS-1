import React from 'react';
import style from './style.module.scss';
import { ProfileOrganizerMainInfo } from '~/features/profile-organizer-main-info';
import { ProfileOrganizerNavbar } from '~/features/profile-organizer-navbar';
import { ProfileTemplate } from '../profile-template';

export const ProfileOrganizerTemplate = ({ children }) => (
    <ProfileTemplate>
        <div className={style['__main-info']}>
            <ProfileOrganizerMainInfo />
        </div>
        <div className={style['__navbar']}>
            <ProfileOrganizerNavbar />
        </div>
        {children}
    </ProfileTemplate>
);