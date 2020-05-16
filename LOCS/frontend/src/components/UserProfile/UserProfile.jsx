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
                    <Route path='/UserProfile/me/FriendRequestsIn' render={() => <FriendRequestsInContainer />} />
                    <Route path='/UserProfile/me/FriendRequestsOut' render={() => <FriendRequestsOutContainer />} />
                    <Route path='/UserProfile/me/SearchUsers' render={() => <SearchUsersContainer {...props} />} />
                    <Route path='/UserProfile/me/Organizer' render={() => 'Будет доступно в ближайших патчах :3'} />
                    <Route path='/UserProfile/:userId' render={(routeProps) => <ProfileContainer route={routeProps.match.params} />} />
                </Switch>
            </div>
            
            <footer>
                {props.route.userId === 'me' ?
                    <Switch>
                        <Route path='/UserProfile/me/:typeContent' render={(routeProps) => <FooterContainer
                            logoutMe={props.logoutMe}
                            route={routeProps.match.params}
                        />} />
                        <Route path='/UserProfile/:typeContent' render={(routeProps) => <FooterContainer
                            logoutMe={props.logoutMe}
                            route={routeProps.match.params}
                        />} />
                    </Switch> : ''
                }
            </footer>
        </div>
    );
}