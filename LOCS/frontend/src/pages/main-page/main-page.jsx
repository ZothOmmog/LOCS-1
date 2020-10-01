import React from 'react';
import { SelectedTagsList } from '~/features/selected-tags-list';
import { MainTemplate } from '~/templates';
import { EventListMain } from './event-list-main';

export const MainPage = () => (
    <MainTemplate>
        <SelectedTagsList />
        <EventListMain />
    </MainTemplate>
);
