import { friendsApi, userAPI } from "../api/indexApi.js";

const ADD_FRIEND = 'ADD_FRIEND';
const DELETE_FRIEND = 'DELETE_FRIEND';
const ACCEPT_FRIEND = 'ACCEPT_FRIEND';
const SET_FRIENDS = 'SET_FRIENDS';
const SET_FRIEND_REQUESTS_OUT = 'SET_FRIEND_REQUESTS_OUT';
const SET_FRIEND_REQUESTS_IN = 'SET_FRIEND_REQUESTS_IN';
const CLEAN_FRIENDS = 'CLEAN_FRIENDS';

const initialState = {
    friends: null,
    friendRequestsIn: null,
    friendRequestsOut: null,

    page: {
        countFriends: 5,
        currentPage: 1
    }
}

export const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FRIEND:
            return state.friends ? { ...state, friends: state.friends.push(action.user) } : state;
        case DELETE_FRIEND:
            return state.friends ? { ...state, friends: state.friends.filter( (user) => user.id !== action.userId ) } : state;
        case ACCEPT_FRIEND:
            return state.friends ? { ...state, friends: state.friends.push(action.user) } : state;
        case SET_FRIENDS:
            return { ...state, friends: action.friends };
        case SET_FRIEND_REQUESTS_IN:
            return { ...state, friendRequestsIn: action.friendRequestsIn };
        case SET_FRIEND_REQUESTS_OUT:
            return { ...state, friendRequestsOut: action.friendRequestsOut };
        case CLEAN_FRIENDS:
            return initialState;
        default:
            return state;
    }
}

export const addFriendThunk = (idUser) => async (dispatch) => {
    const isAdded = await friendsApi.addUserInFriends(idUser);
    
    if(isAdded.err) throw new Error(`Добавление пользователя в друзья не удалось: ${isAdded.err}`);

    const userAdded = await userAPI.getUser(idUser);
    const userForDispatch = {
        id: idUser,
        nick: userAdded.User.nick
    };
    
    dispatch( addFriend(userForDispatch) );
}

export const deleteFriendThunk = (idUser) => async (dispatch) => {
    const isDeleted = await friendsApi.deleteUserFromFriends(idUser);
    if(isDeleted.err) throw new Error(`Не удалось удалить пользователя из друзей: ${isDeleted.err}`);
    dispatch( deleteFriend(idUser) );
}

export const acceptFriendThunk = (idUser) => async (dispatch) => {
    const isAccepted = await friendsApi.acceptUser(idUser);

    if (!isAccepted) throw new Error('Не удалось удалить пользователя.');

    const userAccepted = await userAPI.getUser(idUser);
    const userForDispatch = {
        id: idUser,
        nick: userAccepted.User.nick
    };

    dispatch( acceptFriend(userForDispatch) );
}

export const setFriendsThunk = () => async (dispatch, getState) => {
    const users = await friendsApi.getFriends(
        getState.friends.page.countFriends, 
        getState.friends.page.currentPage
    );

    if(users.err) throw new Error(users.err);

    const usersForDispatch = users.map(user => ({ 
        id: user.friend.id_user, 
        nick: user.request.nickname 
    }));

    dispatch( setFriends(usersForDispatch) );
}

export const setFriendRequestsInThunk = () => async (dispatch, getState) => {
    const users = await friendsApi.getFriendRequestsIn(
        getState.friends.page.countFriends, 
        getState.friends.page.currentPage
    );

    if(users.err) throw new Error(users.err);

    const usersForDispatch = users.map(user => ({ 
        id: user.request.id_user, 
        nick: user.request.nickname
    }));

    dispatch( setFriendRequestsIn(usersForDispatch) );
}

export const setFriendRequestsOutThunk = () => async (dispatch, getState) => {
    const users = await friendsApi.getFriendRequestsOut(
        getState.friends.page.countFriends, 
        getState.friends.page.currentPage
    );

    if(users.err) throw new Error(users.err);

    const usersForDispatch = users.map(user => ({ 
        id: user.request.id_user, 
        nick: user.request.nickname
    }));

    dispatch( setFriends(usersForDispatch) );
}

export const addFriend = (user) => ({ type: ADD_FRIEND, user: user });
export const deleteFriend = (userId) => ({ type: DELETE_FRIEND, userId: userId });
export const acceptFriend = (user) => ({ type: ACCEPT_FRIEND, user: user });
export const setFriends = (friends) => ({ type: SET_FRIENDS, friends: friends });
export const setFriendRequestsIn = (friendRequestsIn) => ({ type: SET_FRIEND_REQUESTS_IN, friendRequestsIn: friendRequestsIn });
export const setFriendRequestsOut = (friendRequestsOut) => ({ type: SET_FRIEND_REQUESTS_OUT, friendRequestsOut: friendRequestsOut });
export const cleanFriends = (user) => ({ type: ADD_FRIEND, user: user });