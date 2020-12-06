import React from 'react';
import { ProfileOrganizerEventsListTemplate } from '~/templates/profile-organizer-events-list-template';
import { MyEventsList } from './my-events-list';

export const ProfileOrganizerEventsListPage = () => (
    <ProfileOrganizerEventsListTemplate>
        <MyEventsList />
    </ProfileOrganizerEventsListTemplate>
);