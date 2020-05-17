import React from 'react';
import { connect } from 'react-redux';
import { Button } from '../../indexComponents';
import s from './AddFriendButton.module.scss';
import { 
    addFriendThunk, 
    deleteFriendThunk, 
    setFriendStatus, 
    acceptFriendThunk
} from '../../../redux/indexReducers.js';

const FRIEND_STATUS_NOT_IN_FRIENDS = -1;
const FRIEND_STATUS_REQUEST_OUT = 0;
const FRIEND_STATUS_REQUEST_IN = 1;
const FRIEND_STATUS_IN_FRIENDS = 2;

const AddFriendButton = (props) => {
    let style = { type: 'NotBorderRadius', size:'FullContainer' };
    let styleForRequestIn;

    switch(+props.friendStatus) {
        case FRIEND_STATUS_NOT_IN_FRIENDS:
            style.buttonText = 'Добавить в друзья';
            style.onClickHandler = () => {
                props.setFriendStatus(FRIEND_STATUS_REQUEST_OUT);
                props.addFriendThunk(props.userId);
            }
            break;
        case FRIEND_STATUS_REQUEST_OUT:
            style.buttonText = 'Отменить заявку';
            style.onClickHandler = () => {
                props.setFriendStatus(FRIEND_STATUS_NOT_IN_FRIENDS);
                props.deleteFriendThunkForRequestsOut(props.userId);
            }
            break;
        case FRIEND_STATUS_REQUEST_IN:
            style.buttonText = 'Добавить в друзья';
            style.onClickHandler = () => {
                props.setFriendStatus(FRIEND_STATUS_IN_FRIENDS);
                props.acceptFriendThunk(props.userId);
            }

            styleForRequestIn = { 
                type: 'NotBorderRadiusRed', 
                size:'FullContainer',
                buttonText: 'Отказать',
                onClickHandler: () => {
                    props.setFriendStatus(FRIEND_STATUS_NOT_IN_FRIENDS);
                    props.deleteFriendThunkForRequestsIn(props.userId);
                }
            };
            break;
        case FRIEND_STATUS_IN_FRIENDS:
            style.buttonText = 'Удалить из друзьей';
            style.onClickHandler = () => {
                props.setFriendStatus(FRIEND_STATUS_NOT_IN_FRIENDS);
                props.deleteFriendThunkForFriends(props.userId);
            }
            break;
        default:
            // throw new Error('Неизвестный статус пользователя');
            break;
    };

    return (
        +props.friendStatus !== FRIEND_STATUS_REQUEST_IN ?
        <div className={s.AddFriendButton}>
            <Button style={style} />
        </div> :

        <div className={s.AddFriendButtons}>
            <div className={s.AddFriendButton}>
                <Button style={style} />
            </div>
            <div className={s.AddFriendButton}>
                <Button style={styleForRequestIn} />
            </div>
        </div>
    );
}

const deleteFriendThunkForFriends = deleteFriendThunk('Friends'); 
const deleteFriendThunkForRequestsIn = deleteFriendThunk('FriendRequestsIn'); 
const deleteFriendThunkForRequestsOut = deleteFriendThunk('FriendRequestsOut'); 

export const AddFriendButtonContainer = connect(null, {
    addFriendThunk, acceptFriendThunk, setFriendStatus,
    deleteFriendThunkForFriends, deleteFriendThunkForRequestsIn, deleteFriendThunkForRequestsOut
})(AddFriendButton);