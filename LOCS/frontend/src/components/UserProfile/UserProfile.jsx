import React from 'react';
import s from './UserProfile.module.scss';
import { ProfileContainer } from './Profile/ProfileContainer';
import { Switch, Route } from 'react-router-dom';
import { SearchUsersContainer } from './SearchUsers/SearchUsersContainer';
import { Header } from './Header/Header';
import { FriendRequestsOutContainer } from './FriendRequestsOut/FriendRequestsOutContainer';
import { FriendRequestsInContainer } from './FriendRequestsIn/FriendRequestsInContainer';
import { FooterContainer } from './Footer/FooterContainer';
import { FriendsContainer } from './Friends/FriendsWithProps';
import { OrganizerWithSignUpRedirect, OrganizerOuther } from './Organizer/Organizer';
import { RegistrationContainer as RegistrationOrganizer } from './Organizer/Registration/RegistrationContainer';
import { Subscribers } from './Organizer/Subscribers/Subscribers';
import { AddEvent } from '../AddEvent/AddEvent';
import { Events } from './Organizer/Events/Events';
import { EditEvent } from './Organizer/EditEvent/EditEvent';

export const UserProfile = (props) => {
    return (
        <div className={s.UserProfile}>
            <header>
                {props.route.userId === 'me' ?
                    <Switch>
                        <Route path='/UserProfile/me/:typeContent' render={(routeProps) => <Header
                            route={routeProps.match.params}
                        />} />
                        <Route path='/UserProfile/:typeContent' render={(routeProps) => <Header
                            route={routeProps.match.params}
                        />} />
                    </Switch> : ''
                }
            </header>

            <div className={props.route.userId === 'me' ? s.UserProfile__ContentWrapper : s.UserProfile__OtherWrapper}>
                <Switch>
                    <Route path='/UserProfile/me/Friends' render={() => <FriendsContainer />} />
                    <Route path='/UserProfile/me/Subscribes' render={() => <Subscribers />} />
                    <Route path='/UserProfile/me/FriendRequestsIn' render={() => <FriendRequestsInContainer />} />
                    <Route path='/UserProfile/me/FriendRequestsOut' render={() => <FriendRequestsOutContainer />} />
                    <Route path='/UserProfile/me/SearchUsers' render={() => <SearchUsersContainer {...props} />} />
                    <Route path='/UserProfile/me/Organizer/Subscribers' render={() => <Subscribers />} />
                    <Route path='/UserProfile/me/Organizer/Events' render={() => <Events />} />
                    <Route path='/UserProfile/me/Organizer/EditEvent/:eventId' render={({ match: { params: { eventId } } }) => <EditEvent eventId={eventId} />} />
                    <Route path='/UserProfile/me/Organizer/AddEvent' render={() => <AddEvent/>} />
                    <Route path='/UserProfile/me/Organizer/Registration' render={() => <RegistrationOrganizer />} />
                    <Route path='/UserProfile/me/Organizer' render={() => <OrganizerWithSignUpRedirect userId='me' />} />
                    <Route path='/UserProfile/:userId/Organizer' render={({ match: { params: { userId } } }) => <OrganizerOuther userId={userId} />} />
                    <Route path='/UserProfile/:userId' render={(routeProps) => <ProfileContainer route={routeProps.match.params} />} />
                </Switch>
            </div>
            
            <footer>
                {props.route.userId === 'me' ?
                    <FooterContainer /> : ''
                }
            </footer>
        </div>
    );
}