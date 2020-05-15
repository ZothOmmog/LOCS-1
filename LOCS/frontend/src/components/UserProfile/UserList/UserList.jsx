import React from 'react';
import { UserProfileShort } from '../../UserProfileShort/UserProfileShort';
import { AddFriendButtonContainer } from '../AddFriendButton/AddFriendButton';
import s from './UserList.module.scss';
import { PagesNumbersMenu } from '../../PagesNumbersMenu/PagesNumbersMenu';

export const UserList = (props) => {
    const users = props.users ? props.users.map(user => (
        <div key={user.id} className={s.UserList__item}>
            <div className={s.UserList__UserProfileShort}>
                <UserProfileShort key={user.id} userId={user.id} nick={user.nick} />
            </div>
            <div className={s.UserList__AddFriendButtonContainer}>
                <AddFriendButtonContainer key={user.id} userId={user.id} friendStatus={user.friendStatus} />
            </div>
        </div>
    )) : '';

    return <div className={s.UserList}>
        {users}
        <div className={s.UserList__PagesNumbersMenu}>
            {props.pages ?
                <PagesNumbersMenu
                    pages={props.pages}
                    changeCurrentPage={props.changeCurrentPage}
                    currentPage={props.currentPage}
                /> : ''
            }
        </div>
    </div>;
}