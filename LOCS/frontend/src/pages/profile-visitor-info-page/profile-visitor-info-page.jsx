import React from 'react';
import { ProfileVisitorInfo } from '~/features/profile-visitor-info';
import { ProfileVisitorInfoTemplate } from '~/templates/profile-visitor-info-template';

export const ProfileVisitorInfoPage = () => {
    return (
        <ProfileVisitorInfoTemplate>
            <ProfileVisitorInfo />
        </ProfileVisitorInfoTemplate>
    );
}