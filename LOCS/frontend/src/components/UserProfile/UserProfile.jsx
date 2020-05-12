import React from 'react';
import '../CommonStyles/Button/Button.css';
import s from './UserProfile.module.scss';
import { Route, Switch } from 'react-router-dom';
import { SearchUsersContainer } from './SearchUsers/SearchUsersContainer.jsx';
import { ProfileFunctions } from './ProfileFunctions/ProfileFunctions';

export const UserProfile = (props) => {
    const imgUrl = 'https://im0-tub-ru.yandex.net/i?id=bc7f9021eae00edbac26dc53c0e013c4&n=13';
    return (
        <div className={s.UserProfile}>
            <h1 className={s.UserProfile__Title}>Профиль пользователя</h1>
            <div className={s.UserProfileConntentWrapperOuther}>
                <div className={s.UserProfileConntentWrapperInner}>
                    <div className={s.UserProfileOutherWrapper}>
                        <div className={s.UserProfileInnerWrapper}>
                            <div className={s.UserProfileInnerWrapperPicture}>
                                <img className={s.UserProfileInnerWrapperPicture__Img} src={imgUrl} alt='' />
                                {props.route.userId === 'me' ?
                                    <div className={`button ${s.UserProfileInnerWrapperPicture__Button}`}>
                                        Загрузить изображение
                                    </div> : null
                                }
                            </div>

                            <div className={s.UserProfileInnerWrapperDescribtion}>
                                <div className={s.UserProfileInnerWrapperDescribtion__Item}><b>Ник:</b> {props.nick}</div>
                                <div className={s.UserProfileInnerWrapperDescribtion__Item}><b>Почта:</b> {props.mail}</div>
                                <div className={s.UserProfileInnerWrapperDescribtion__Item}><b>Город:</b> {props.city}</div>
                            </div>
                        </div>
                    </div>
                    {props.route.userId === 'me' ?
                        <div className={s.UserProfileFunctionsOutherWrapper}>
                            <Switch>
                                <Route path='/userProfile/me/SearchUsers' render={() => <SearchUsersContainer />} />
                                <Route path='/userProfile/me/FriendRequestOut' />
                                <Route path='/userProfile/me/FriendRequestIn' />
                                <Route path='/userProfile/me' render={() => <ProfileFunctions />} />
                            </Switch>
                        </div> : <button>Добавить в друзья</button>
                    }
                </div>
            </div>
            {props.route.userId === 'me' ?
                <div
                    className={`button ${s.UserProfile__ExitButton}`}
                    onClick={props.logoutMeThunk}
                >
                    Выход
                </div> : null
            }
        </div>
    );
}