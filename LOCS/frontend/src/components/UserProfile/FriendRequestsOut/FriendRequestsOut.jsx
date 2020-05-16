import React from 'react';
import { UserList } from "../UserList/UserList";

export const FriendRequestsOut = (props) => {
    return (
        props.friendRequestsOut === null ? 'Загрузка...' : 
        props.friendRequestsOut.length === 0 ? 'Нет отправленных заявок без ответа' :
        <UserList
            users={props.friendRequestsOut}
            pages={props.pages}
            changeCurrentPage={props.changeCurrentPageFriendRequestsOut}
            currentPage={props.currentPage}
        />
    );
}