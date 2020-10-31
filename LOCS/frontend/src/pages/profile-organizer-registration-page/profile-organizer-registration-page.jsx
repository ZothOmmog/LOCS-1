import React from 'react';
import { ProfileOrganizerRegistrationTemplate } from '~/templates/profile-organizer-registration-template';
import { RegistrationOrganizerForm } from './registration-organizer-form';

export const ProfileOrganizerRegistrationPage = () => (
    <ProfileOrganizerRegistrationTemplate>
        <RegistrationOrganizerForm />
    </ProfileOrganizerRegistrationTemplate>
);