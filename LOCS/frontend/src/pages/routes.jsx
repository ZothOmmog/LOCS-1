import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from '~/features/private-route';
import { MainTemplate } from '~/templates';
import { ProfileOrganizerTemplate } from '~/templates/profile-organizer-template/profile-organizer-template';
import { MainPage } from './main-page';
import { ProfileOrganizerEventsCreatePage } from './profile-organizer-events-create-page';
import { ProfileOrganizerEventsListPage } from './profile-organizer-events-list-page';
import { ProfileOrganizerInfoPage } from './profile-organizer-info-page';
import { ProfileVisitorInfoPage } from './profile-visitor-info-page';
import { ProfileVisitorSubscribesPage } from './profile-visitor-subscribes-page';

export const Routes = () => (
    <Switch>
        <Route exact path='/'>
            <MainPage />
        </Route>
        <PrivateRoute path='/profile/visitor/info'>
            <ProfileVisitorInfoPage />
        </PrivateRoute>
        <PrivateRoute path='/profile/visitor/subscribes'>
            <ProfileVisitorSubscribesPage />
        </PrivateRoute>
        <PrivateRoute path='/profile/visitor/friends'>
            <ProfileVisitorInfoPage />
        </PrivateRoute>
        <PrivateRoute path='/profile/organizer/info'>
            <ProfileOrganizerInfoPage />
        </PrivateRoute>
        <PrivateRoute path='/profile/organizer/events/list'>
            <ProfileOrganizerEventsListPage />
        </PrivateRoute>
        <PrivateRoute path='/profile/organizer/events/create'>
            <ProfileOrganizerEventsCreatePage />
        </PrivateRoute>
        <PrivateRoute path='/profile/organizer/events/edit'>
            <ProfileOrganizerTemplate>
                редактирование мероприятия
            </ProfileOrganizerTemplate>
        </PrivateRoute>
        <PrivateRoute path='/profile/organizer/events/remove'>
            <ProfileOrganizerTemplate>
                удаление мероприятия
            </ProfileOrganizerTemplate>
        </PrivateRoute>
        <Route exact path='/map'>
            <MainTemplate>
                {null}
                <div>Страница с картой</div>
            </MainTemplate>
        </Route>
        <Route path='*'>
            <Redirect to='/' />
        </Route>
    </Switch>
);