import React from 'react';
import s from './Footer.module.scss';
import { Button } from '../../Button-bem/Button';
import { NavButton } from '../../NavButton/NavButton';
import { OrganizerFooter } from './Organizer/OrganizerFooter';
import { Route, Switch } from 'react-router-dom';
import { VisitorFooter } from './Visitor/VisitorFooter';

export const Footer = (props) => {
    return (
        <Switch>
            <Route path='/UserProfile/me/Organizer/:typeContent'
                render={(routeProps) => <OrganizerFooter
                    route={routeProps.match.params}
                />}
            />
            <Route path='/UserProfile/me/Organizer'
                render={() => <OrganizerFooter
                    route={{ typeContent: 'Organizer' }}
                />}
            /> 
            <Route path='/UserProfile/me/:typeContent'
                render={(routeProps) => <VisitorFooter
                    route={routeProps.match.params}
                />}
            />
            <Route
                path='/UserProfile/me'
                render={() => <VisitorFooter
                    route={{ typeContent: 'me' }}
                />}
            />
        </Switch>
    );
}