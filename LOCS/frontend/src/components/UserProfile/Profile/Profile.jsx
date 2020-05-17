import React from 'react';
import s from './Profile.module.scss';
import { Button } from '../../Button-bem/Button';
import { AddFriendButtonContainer } from '../AddFriendButton/AddFriendButton';
import { BackButtonWithProps } from '../../BackButton/BackButton';

// const FRIEND_STATUS_NOT_IN_FRIENDS = -1;
const FRIEND_STATUS_REQUEST_OUT = 0;
const FRIEND_STATUS_REQUEST_IN = 1;
const FRIEND_STATUS_IN_FRIENDS = 2;

export const Profile = (props) => {
    const imgUrl = 'https://im0-tub-ru.yandex.net/i?id=bc7f9021eae00edbac26dc53c0e013c4&n=13';

    return (
        <div className={s.Profile}>
            {
                props.userId !== 'me' ?
                    <div className={s.Profile__BackButton}>
                        <BackButtonWithProps />
                    </div> : ''
            }
            <div className={s.Profile__ContentWrapper}>
                <div className={s.ProfilePicture}>
                    <img className={s.Profile__Img} src={imgUrl} alt='' />
                </div>

                <div className={s.ProfileDescribtionTitles}>
                    <div className={s.ProfileDescribtionTitles__Item}>Никнейм:</div>
                    <div className={s.ProfileDescribtionTitles__Item}>Электронная почта:</div>
                    <div className={s.ProfileDescribtionTitles__Item}>Город:</div>
                </div>

                <div className={s.ProfileDescribtionItems}>
                    <div className={s.ProfileDescribtionItems__Item}>{props.nick}</div>
                    <div className={s.ProfileDescribtionItems__Item}>{props.mail}</div>
                    <div className={s.ProfileDescribtionItems__Item}>{props.city}</div>
                </div>
            </div>

            {props.userId === 'me' ?
                <div className={s.Profile__Button}>
                    <Button style={{
                        buttonText: 'Загрузить фото',
                        type: 'NotBorderRadius',
                        size: 'FullContainer'
                    }} />
                </div> : 
                <div className={s.Profile__AddUser}>
                    <AddFriendButtonContainer userId={props.userId} friendStatus={props.friendStatus} />
                    {
                        props.friendStatus === FRIEND_STATUS_IN_FRIENDS ?
                        <div>(Этот пользователь у вас в друзьях)</div> :
                        props.friendStatus === FRIEND_STATUS_REQUEST_IN ?
                        <div>(Этот пользователь отправил вам заявку в друзья)</div> :
                        props.friendStatus === FRIEND_STATUS_REQUEST_OUT ?
                        <div>(Вы отправили этому пользователю заявку в друзья)</div> : ''
                    }
                </div>
            }
        </div>
    );
}