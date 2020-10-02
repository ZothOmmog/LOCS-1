import React from 'react';
import { ProfileOrganizerEventsCreateTemplate } from '~/templates/profile-organizer-events-create-template/profile-organizer-events-create-template';
import { CreateEventForm } from './create-event-form';

export const ProfileOrganizerEventsCreatePage = () => {

return (
    <ProfileOrganizerEventsCreateTemplate>
        <CreateEventForm />
    </ProfileOrganizerEventsCreateTemplate>
);
};