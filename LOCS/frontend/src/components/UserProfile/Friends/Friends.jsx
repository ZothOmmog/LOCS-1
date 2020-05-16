import React from 'react';
import { UserList } from "../UserList/UserList";

export const Friends = (props) => {
    return (
        props.Friends === null ? 'Загрузка...' : 
        props.Friends.length === 0 ? 'У вас ещё пока что друзей' :
        <UserList
            users={props.Friends}
            pages={props.pages}
            changeCurrentPage={props.changeCurrentPageFriends}
            currentPage={props.currentPage}
        />
    );
}