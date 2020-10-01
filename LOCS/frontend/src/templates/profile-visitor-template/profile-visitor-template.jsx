import React from 'react';
import style from './style.module.scss';
import { ProfileTemplate } from '../profile-template';
import { ProfileVisitorNavbar } from '~/features/profile-visitor-navbar';
import { ProfileVisitorMainInfo } from '~/features/profile-visitor-main-info';

export const ProfileVisitorTemplate = ({ children }) => (
    <ProfileTemplate>
        <div className={style['__main-info']}>
            <ProfileVisitorMainInfo />
        </div>
        <div className={style['__navbar']}>
            <ProfileVisitorNavbar />
        </div>
        {children}
    </ProfileTemplate>
);