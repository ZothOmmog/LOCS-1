import React from 'react';
import { UserList } from "../UserList/UserList";

export const FriendRequestsOut = (props) => {
    return (
        <UserList
            users={props.friendRequestsOut}
            pages={props.pages}
            changeCurrentPage={props.changeCurrentPageFriendRequestsOut}
            currentPage={props.currentPage}
        />
    );
}