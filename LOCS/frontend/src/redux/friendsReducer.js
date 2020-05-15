import { friendsApi, userAPI } from "../api/indexApi.js";

const ADD_FRIEND = 'ADD_FRIEND';
const DELETE_FRIEND = 'DELETE_FRIEND';
const ACCEPT_FRIEND = 'ACCEPT_FRIEND';
const SET_FRIENDS = 'SET_FRIENDS';
const SET_FRIEND_REQUESTS_OUT = 'SET_FRIEND_REQUESTS_OUT';
const SET_FRIEND_REQUESTS_IN = 'SET_FRIEND_REQUESTS_IN';
const CLEAN_FRIENDS = 'CLEAN_FRIENDS';
const CHANGE_CURRENT_PAGE_FRIENDS = 'CHANGE_CURRENT_PAGE_FRIENDS';
const SET_FRIENDS_PAGES = 'SET_FRIENDS_PAGES';

const initialState = {
    friends: null,
    friendRequestsIn: null,
    friendRequestsOut: null,
    currentPage: 1,
    pages: null,

    friendRequestsOutPage: {
        pageSize: 4
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
        case CHANGE_CURRENT_PAGE_FRIENDS:
            return {...state, currentPage: action.currentPage};
        case SET_FRIENDS_PAGES:
            let pages = [];

			for (let i = 1; i <= Math.ceil(action.resultSize / action.countUsers); i++) {
				pages = [...pages, i];
            }

            return {...state, pages: pages};
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
        getState().friends.friendsPage.countFriends, 
        getState().friends.currentPage
    );

    if(users.err) throw new Error(users.err);

    const usersForDispatch = users.map(user => ({ 
        id: user.friend.id_user, 
        nick: user.request.nickname 
    }));

    dispatch( setFriends(usersForDispatch) );
}

export const setFriendRequestsInThunk = () => async (dispatch, getState) => {
    const countUsers = getState().friends.friendRequestsInPage.countFriends;

    const users = await friendsApi.getFriendRequestsIn(
        countUsers,
        getState().friends.currentPage
    );

    if(users.err) throw new Error(users.err);

    const usersForDispatch = users.data.map(user => ({ 
        id: user.request.id_user, 
        nick: user.request.nickname
    }));

    dispatch( setFriendRequestsIn(usersForDispatch) );
}

export const setFriendRequestsOutThunk = () => async (dispatch, getState) => {
    const countUsers = getState().friends.friendRequestsOutPage.pageSize;

    const users = await friendsApi.getFriendRequestsOut(
        countUsers, 
        getState().friends.currentPage
    );

    if(users.err) throw new Error(users.err);

    const usersForDispatch = users.data.map(user => ({ 
        id: user.request.id_user,
        friendStatus: 0,
        nick: user.request.nickname
    }));

    dispatch( setFriendsPages(users.count, countUsers) );
    dispatch( setFriendRequestsOut(usersForDispatch) );
}

export const changeCurrentPageFriendsThunk = (type) => (e) => async (dispatch, getState) => {
    const countUsers = getState().friends.friendRequestsOutPage.pageSize;
    const currentPage = e.target.innerText;
    
    const users = type === 'friendRequestsOut' ? await friendsApi.getFriendRequestsOut(
        countUsers, 
        currentPage,
    ) : { err: 'Неправильный тип запроса для смены страницы' };

    if(users.err) throw new Error(users.err);

    const usersForDispatch = users.data.map(user => ({ 
        id: user.request.id_user,
        friendStatus: 0,
        nick: user.request.nickname
    }));

    dispatch( setFriendsPages(users.count, countUsers) );
    dispatch( setFriendRequestsOut(usersForDispatch) );
    dispatch( changeCurrentPageFriends(currentPage) );
}

export const addFriend = (user) => ({ type: ADD_FRIEND, user: user });
export const deleteFriend = (userId) => ({ type: DELETE_FRIEND, userId: userId });
export const acceptFriend = (user) => ({ type: ACCEPT_FRIEND, user: user });
export const setFriends = (friends) => ({ type: SET_FRIENDS, friends: friends });
export const setFriendRequestsIn = (friendRequestsIn) => ({ type: SET_FRIEND_REQUESTS_IN, friendRequestsIn: friendRequestsIn });
export const setFriendRequestsOut = (friendRequestsOut) => ({ type: SET_FRIEND_REQUESTS_OUT, friendRequestsOut: friendRequestsOut });
export const cleanFriends = () => ({ type: CLEAN_FRIENDS });
export const changeCurrentPageFriends = (currentPage) => ({ type: CHANGE_CURRENT_PAGE_FRIENDS, currentPage: currentPage });
export const setFriendsPages = (resultSize, countUsers) => ({ type: SET_FRIENDS_PAGES, resultSize: resultSize, countUsers: countUsers });