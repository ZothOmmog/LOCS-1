//TODO переписать нормально эту кашу...
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

// import searchReducer from './searchReducer';
import addEventReducer from './addEventReducer';
import lentaReducer from './lentaReducer';
import eventProfileReducer from './eventProfileReducer';
import authReducer from './authReducer';
import registrationReducer from './registrationReducer';
import searchUsersReducer from './searchUsersReducer';
import userProfileReducer from './userProfileReducer';
import { 
    friendsReducer,
    backButtonReducer 
} from './indexReducers';

//Тут уже все в адекватном виде
import {
    searchReducer
} from './reducers';

const reducers = combineReducers({
    search: searchReducer,
    addEventPage: addEventReducer,
    lentaPage: lentaReducer,
    EventProfilePage: eventProfileReducer,
    auth: authReducer,
    registrationPage: registrationReducer,
    searchUsersPage: searchUsersReducer,
    userProfilePage: userProfileReducer,
    friends: friendsReducer,
    backButton: backButtonReducer
});

//TODO надо добавить redux-logger для отладки, вроде хорошая штука
export const store = createStore(reducers, compose(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(logger)
));
