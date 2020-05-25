import React from 'react';
import { OrganizerFooter } from './Organizer/OrganizerFooter';
import { Route, Switch } from 'react-router-dom';
import { VisitorFooter } from './Visitor/VisitorFooter';

export const Footer = ({ logoutMeThunk }) => {
    return (
        <Switch>
            <Route 
                path='/UserProfile/me/Organizer/Registration'
                render={() => ''}
            />
            <Route 
                path='/UserProfile/me/Organizer/:typeContent'
                render={(routeProps) => <OrganizerFooter
                    route={routeProps.match.params}
                    logoutMeThunk={logoutMeThunk}
                />}
            />
            <Route 
                path='/UserProfile/me/Organizer'
                
                render={() => <OrganizerFooter
                    route={{ typeContent: 'Organizer' }}
                    logoutMeThunk={logoutMeThunk}
                />}
            /> 
            <Route 
                path='/UserProfile/me/:typeContent'
                render={(routeProps) => <VisitorFooter
                    route={routeProps.match.params}
                    logoutMeThunk={logoutMeThunk}
                />}
            />
            <Route
                path='/UserProfile/me'
                render={() => <VisitorFooter
                    route={{ typeContent: 'me' }}
                    logoutMeThunk={logoutMeThunk}
                />}
            />
        </Switch>
    );
}