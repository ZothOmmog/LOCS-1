import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import searchReducer from './searchReducer';
import addEventReducer from './addEventReducer';
import lentaReducer from './lentaReducer';
import eventProfileReducer from './eventProfileReducer';
import authReducer from './authReducer';
import registrationReducer from './registrationReducer';

const reducers = combineReducers({
    searchPage: searchReducer,
    addEventPage: addEventReducer,
    lentaPage: lentaReducer,
    EventProfilePage: eventProfileReducer,
    auth: authReducer,
    registrationPage: registrationReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;