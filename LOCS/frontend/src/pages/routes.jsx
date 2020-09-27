import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MainPage } from './main-page';
import { ProfileVisitorInfoPage } from './profile-visitor-info-page';

export const Routes = () => (
    <Switch>
        <Route exact path='/'>
            <MainPage />
        </Route>
        <Route path='/registration'>
            <div>Страница с регистрацией</div>
        </Route>
        <Route path='/profile/visitor/info'>
            <ProfileVisitorInfoPage />
        </Route>
        <Route exact path='/map'>
            <div>Страница с картой</div>
        </Route>
        <Route path='*'>
            <Redirect to='/' />
        </Route>
    </Switch>
);