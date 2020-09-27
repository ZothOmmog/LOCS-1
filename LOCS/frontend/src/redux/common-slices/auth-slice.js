import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const MOCK_AUTH_TRUE = { 
    Mail: "test@gmail.com",
    Nick: "tuser",
    City: "test_city",
    UrlPicture: null,
    Auth: true
};

const MOCK_AUTH_FALSE = { 
    Auth: false
};

const MOCK_USER = {
    login: 'test@gmail.com',
    password: '123'
}

//====================slice-name====================
const SLICE_NAME = 'auth';
//==================================================

//====================thunks====================
//TODO реальизовать без mock
const thunks = {
    fetchAuth: createAsyncThunk(
        `${SLICE_NAME}/fetchAuth`,
        async () => {
            return { ...MOCK_AUTH_FALSE };
        }
    ),
    fetchLogin: createAsyncThunk(
        `${SLICE_NAME}/fetchAuth`,
        async ({ login, password }) => {
            return (
                login === MOCK_USER.login && 
                password === MOCK_USER.password ? (
                    { ...MOCK_AUTH_TRUE }
                ) : (
                    { ...MOCK_AUTH_FALSE }
                )
            );
        }
    )
};
//==============================================

//====================initialState====================
const initialState = {
    user: {
        mail: null,
        nick: null,
        city: null,
        urlPicture: null
    },
    isAuth: false,
    isLoading: null
};
//====================================================

//====================slice====================
const { actions, reducer } = createSlice({
    name: SLICE_NAME,
    initialState: initialState,
    reducers: {
        logout: state => {
            state = initialState;
        },
    },
    extraReducers: {
        [thunks.fetchAuth.pending]: (state) => {
            state.isLoading = true;
        },
        [thunks.fetchAuth.fulfilled]: (state, action) => {
            const { Mail: mail, Nick: nick, City: city, UrlPicture: urlPicture, Auth: isAuth } = action.payload;

            if(isAuth) {
                state.user = { mail, nick, city, urlPicture };
                state.isAuth = true;
            }

            state.isLoading = false;
        }
    }
});
//=============================================

//====================selectors====================
const sliceSelector = state => state.auth;
const isAuthSelector = state => sliceSelector(state).isAuth;
const isLoadingSelector = state => sliceSelector(state).isLoading;
const userSelector = state => sliceSelector(state).user;
const userNickSelector = state => userSelector(state).nick;
const userUrlPictureSelector = state => userSelector(state).urlPicture;

const selectors = {
    isAuthSelector,
    isLoadingSelector,
    userSelector,
    userNickSelector,
    userUrlPictureSelector,    
};
//=================================================

//====================exports====================
export { selectors as authSelectors };
export { thunks as authThunks };
export { actions as authActions };
export { reducer as authReducer };
//===============================================