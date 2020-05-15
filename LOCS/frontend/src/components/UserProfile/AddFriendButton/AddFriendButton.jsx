import React from 'react';
import { connect } from 'react-redux';
import { Button } from '../../indexComponents';
import s from './AddFriendButton.module.scss';
import { 
    addFriendThunk, 
    deleteFriendThunk, 
    setFriendStatus 
} from '../../../redux/indexReducers.js';

const AddFriendButton = (props) => {
    let style = { type: 'NotBorderRadius', size:'FullContainer' };
    switch(+props.friendStatus) {
        case -1: //Нет в друзьях
            style.buttonText = 'Добавить в друзья';
            style.onClickHandler = () => {
                props.setFriendStatus(0);
                props.addFriendThunk(props.userId);
            }
            break;
        case 0: //Отправлена заявка
            style.buttonText = 'Отменить заявку';
            style.onClickHandler = () => {
                props.setFriendStatus(-1);
                props.deleteFriendThunk(props.userId);
            }
            break;
        case 1: //Входящая заявка
            style.buttonText = 'Добавить в друзья';
            style.onClickHandler = () => {
                props.setFriendStatus(2);
                props.addFriendThunk(props.userId);
            }
            break;
        case 2: //В друзьях
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
            
            {/* {
                props.friendStatus === 0 ? 
                <div className={s.AddFriendButton__Description}>
                    (Вы отправили заявку в друзья этому пользователю)
                </div> :
                props.friendStatus === 1 ?
                <div className={s.AddFriendButton__Description}>
                    (Пользователь отправил заявку в друзья)
                </div> : ''
            } */}
        </div>

    );
}

const mapStateToProps = (state) => ({
    friendStatus: state.userProfilePage.friendStatus
});

export const AddFriendButtonContainer = connect(mapStateToProps, {addFriendThunk, deleteFriendThunk, setFriendStatus})(AddFriendButton);