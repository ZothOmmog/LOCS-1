import React from 'react';
import { ProfileVisitorTemplate } from '../profile-visitor-template';
import style from './style.module.scss';

export const ProfileVisitorInfoTemplate = ({ children }) => (
    <ProfileVisitorTemplate>
        <div className={style['__info']}>
            {children}
        </div>
    </ProfileVisitorTemplate>
);