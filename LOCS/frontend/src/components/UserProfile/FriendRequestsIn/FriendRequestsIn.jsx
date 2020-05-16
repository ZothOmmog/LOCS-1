import React from 'react';
import { UserList } from "../UserList/UserList";

export const FriendRequestsIn = (props) => {
    return (
        props.friendRequestsIn === null ? 'Загрузка...' : 
        props.friendRequestsIn.length === 0 ? 'Нет входящих заявок без ответа' :
        <UserList
            users={props.friendRequestsIn}
            pages={props.pages}
            changeCurrentPage={props.changeCurrentPageFriendRequestsIn}
            currentPage={props.currentPage}
        />
    );
}