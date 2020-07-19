import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MainPage } from './main-page';

export const Routes = () => (
    <Switch>
        <Route 
            exact path='/' 
            render={({ location }) => (
                <MainPage path={location.pathname} />
            )}
        />
        <Route 
            path='/login' 
            render={({ location }) => (
                <div>Страница с логином</div>
            )}
        />
        <Route 
            path='/registration' 
            render={({ location }) => (
                <div>Страница с регистрацией</div>
            )}
        />
        <Route 
            path='/profile' 
            render={({ location }) => (
                <div>Страница с профилем пользователя</div>
            )}
        />
        <Route 
            exact path='/map' 
            render={({ location }) => (
                <div>Страница с картой</div>
            )}
        />
    </Switch>
);