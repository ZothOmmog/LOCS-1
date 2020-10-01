import React from 'react';
import { ProfileVisitorTemplate } from '../profile-visitor-template';
import style from './style.module.scss';

export const ProfileVisitorSubscribersTemplate = ({ children }) => (
    <ProfileVisitorTemplate>
        <div className={style['__subscribers']}>
            {children}
        </div>
    </ProfileVisitorTemplate>
);