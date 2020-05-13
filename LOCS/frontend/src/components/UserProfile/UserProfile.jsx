import React from 'react';
import s from './UserProfile.module.scss';
import { Profile } from './Profile/Profile';
import { Switch, Route } from 'react-router-dom';
import { SearchUsersContainer } from './SearchUsers/SearchUsersContainer';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

export const UserProfile = (props) => {
    return (
        <div className={s.UserProfile}>
            <header>
                {props.route.userId === 'me' ?
                    <Header /> : ''
                }
            </header>

            <div className={props.route.userId === 'me' ? s.UserProfile__ContentWrapper : s.UserProfile__OtherWrapper}>
                <Switch>
                    <Route path='/UserProfile/me/Friends' render={() => 'Будет доступно в ближайших патчах :3'} />
                    <Route path='/UserProfile/me/FriendRequestsIn' render={() => 'Будет доступно в ближайших патчах :3'} />
                    <Route path='/UserProfile/me/FriendRequestsOut' render={() => 'Будет доступно в ближайших патчах :3'} />
                    <Route path='/UserProfile/me/SearchUsers' render={() => <SearchUsersContainer {...props} />} />
                    <Route path='/UserProfile/:userId' render={() => <Profile {...props} />} />
                </Switch>
            </div>
            
            <footer>
                {props.route.userId === 'me' ?
                    <Switch>
                        <Route path='/UserProfile/me/:typeContent' render={(routeProps) => <Footer
                            logoutMe={props.logoutMe}
                            route={routeProps.match.params}
                        />} />
                        <Route path='/UserProfile/:typeContent' render={(routeProps) => <Footer
                            logoutMe={props.logoutMe}
                            route={routeProps.match.params}
                        />} />
                    </Switch> : ''
                }
            </footer>
        </div>
    );
}