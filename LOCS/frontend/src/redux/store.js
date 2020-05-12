import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import searchReducer from './searchReducer';
import addEventReducer from './addEventReducer';
import lentaReducer from './lentaReducer';
import eventProfileReducer from './eventProfileReducer';
import authReducer from './authReducer';
import registrationReducer from './registrationReducer';
import searchUsersReducer from './searchUsersReducer';
import userProfileReducer from './userProfileReducer';
import { friendsReducer } from './indexReducers';

const reducers = combineReducers({
    searchPage: searchReducer,
    addEventPage: addEventReducer,
    lentaPage: lentaReducer,
    EventProfilePage: eventProfileReducer,
    auth: authReducer,
    registrationPage: registrationReducer,
    searchUsersPage: searchUsersReducer,
    userProfilePage: userProfileReducer,
    friends: friendsReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;