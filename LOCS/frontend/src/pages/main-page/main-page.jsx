import React from 'react';
import { NavLinkMap } from '~/ui';
import { HeaderDefault } from '~/features/header-default';
import { SelectedTagsList } from '~/features/selected-tags-list';
import { MainTemplate } from '~/templates';
import { EventListMain } from '~/features/event-list-main';

export const MainPage = () => (
    <MainTemplate>
        <HeaderDefault />
        <SelectedTagsList />
        <EventListMain />
        <NavLinkMap to='/map' />
    </MainTemplate>
);
