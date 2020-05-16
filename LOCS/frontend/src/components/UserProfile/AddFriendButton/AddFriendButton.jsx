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
    switch(+props.friendStatus) {
        case FRIEND_STATUS_NOT_IN_FRIENDS:
            style.buttonText = 'Добавить в друзья';
            style.onClickHandler = () => {
                props.setFriendStatus(0);
                props.addFriendThunk(props.userId);
            }
            break;
        case FRIEND_STATUS_REQUEST_OUT:
            style.buttonText = 'Отменить заявку';
            style.onClickHandler = () => {
                props.setFriendStatus(-1);
                props.deleteFriendThunk(props.userId);
            }
            break;
        case FRIEND_STATUS_REQUEST_IN:
            style.buttonText = 'Добавить в друзья';
            style.onClickHandler = () => {
                props.setFriendStatus(2);
                props.acceptFriendThunk(props.userId);
            }
            break;
        case FRIEND_STATUS_IN_FRIENDS:
            style.buttonText = 'Удалить из друзьей';
            style.onClickHandler = () => {
                props.setFriendStatus(-1);
                props.deleteFriendThunk(props.userId);
            }
            break;
        default:
            // throw new Error('Неизвестный статус пользователя');
            break;
    };

    return (
        <div className={s.AddFriendButton}> 
            <Button style={style}/>
        </div>

    );
}

export const AddFriendButtonContainer = connect(null, {addFriendThunk, acceptFriendThunk, deleteFriendThunk, setFriendStatus})(AddFriendButton);