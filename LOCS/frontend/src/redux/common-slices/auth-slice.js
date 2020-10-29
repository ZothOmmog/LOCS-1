import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from '~/api';


//====================slice-name====================
const SLICE_NAME = 'auth';
//==================================================

//====================thunks====================
const thunks = {
    fetchAuth: createAsyncThunk(
        `${SLICE_NAME}/fetchAuth`,
        async (_payload, thunkApi) => {
            try {
                const { Auth, ...outher } = await userAPI.setMe();
                return { isAuth: Auth, visitor: outher };
            }
            catch(e) {
                return thunkApi.rejectWithValue('Ошибка');
            }
        }
    ),
    fetchLogin: createAsyncThunk(
        `${SLICE_NAME}/fetchLogin`,
        async ({ login, password }, thunkApi) => {
            try {
                await userAPI.login(login, password);
                return { isLogin: true };
            }
            catch(e) {
                return thunkApi.rejectWithValue(e);
            }
        }
    ),
    fetchReg: createAsyncThunk(
        `${SLICE_NAME}/fetchReg`,
        async ({ nick, mail, password }, thunkApi) => {
            try {
                return await userAPI.registration(nick, mail, password);
            }
            catch(e) {
                return thunkApi.rejectWithValue(e);
            }
        }
    )
};
//==============================================

//====================initialState====================
const initialState = {
    visitor: {
        mail: null,
        nick: null,
        city: null,
        urlPicture: null
    },
    organizer: {
        userId: null,
        info: null,
        organizationName: null,
        organizationLink: null,
        logo: null,
        countSub: null
    },
    isAuth: false,
    isLogin: false,
    isLoadingAuth: null,
    isLoadingLogin: null,

    isLoadingReg: false,
    errorReg: '',
    redirectToLoginAfterSuccessReg: false
};
//====================================================

//====================helpers====================
const setMe = (state, payload) => {
    const { isAuth } = payload;

    if(isAuth) {
        const { visitor } = payload;
        if(visitor) {
            const { Mail: mail, Nick: nick, City: city, UrlPicture: urlPicture } = visitor;
            state.visitor = { mail, nick, city, urlPicture };
        }

        const { organizer } = payload;
        if(organizer) {
            const { id_user: idUser, info, organization_name: organizationName, organization_link: organizationLink, logo, countSub } = organizer;
            state.organizer = { idUser, info, organizationName, organizationLink, logo, countSub };
        }

        state.isAuth = true;
    }
};
//===============================================

//====================slice====================
const { actions, reducer } = createSlice({
    name: SLICE_NAME,
    initialState: initialState,
    reducers: {
        logout: state => {
            state.visitor = initialState.visitor;
            state.organizer = initialState.organizer;
            state.isAuth = initialState.isAuth;
            state.isLogin = false;
            state.isLoadingAuth = false;
        },
        redirectToLoginAfterSuccessRegChanged: (state, action) => {
            state.redirectToLoginAfterSuccessReg = action.payload;
        }
    },
    extraReducers: {
        [thunks.fetchAuth.pending]: (state) => {
            state.isLoadingAuth = true;
        },
        [thunks.fetchAuth.fulfilled]: (state, action) => {
            setMe(state, action.payload);
            state.isLoadingAuth = false;
        },
        [thunks.fetchAuth.rejected]: (state, _error) => {
            state.isLoadingAuth = false;
        },

        [thunks.fetchLogin.pending]: (state) => {
            state.isLoadingLogin = true;
        },
        [thunks.fetchLogin.fulfilled]: (state, _action) => {
            state.isLogin = true;
            state.isLoadingLogin = false;
        },
        [thunks.fetchLogin.rejected]: (state) => {
            state.isLoadingLogin = false;
        },

        [thunks.fetchReg.pending]: state => {
            state.isLoadingReg = true;
        },
        [thunks.fetchReg.fulfilled]: (state) => {
            state.isLoadingReg = false;
            state.redirectToLoginAfterSuccessReg = true;
            state.errorReg = '';
        },
        [thunks.fetchReg.rejected]: (state) => {
            state.isLoadingReg = false;
            state.errorReg = 'Пользователь с такой почтой или никнеймом уже зарегистрирован';
        },
    }
});
//=============================================

//====================selectors====================
const sliceSelector = state => state.auth;
const isAuthSelector = state => sliceSelector(state).isAuth;
const isLoginSelector = state => sliceSelector(state).isLogin;
const isLoadingAuthSelector = state => sliceSelector(state).isLoadingAuth;

const visitorSelector = state => sliceSelector(state).visitor;
const visitorNickSelector = state => visitorSelector(state).nick;
const visitorUrlPictureSelector = state => visitorSelector(state).urlPicture;
const visitorMailSelector = state => visitorSelector(state).mail;
const visitorCitySelector = state => visitorSelector(state).city;

const organizerSelector = state => sliceSelector(state).organizer;
const isOrganizerSelector = state => Boolean(organizerSelector(state).userId !== null);
const infoSelector = state => organizerSelector(state).info;
const organizationNameSelector = state => organizerSelector(state).organizationName;
const organizationLinkSelector = state => organizerSelector(state).organizationLink;
const organizationLogoSelector = state => organizerSelector(state).logo;
const countSubSelector = state => organizerSelector(state).countSub;

const errorRegSelector = state => sliceSelector(state).errorReg;
const redirectToLoginAfterSuccessRegSelector = state => sliceSelector(state).redirectToLoginAfterSuccessReg;

const selectors = {
    isAuthSelector,
    isLogin: isLoginSelector,
    isLoadingAuthSelector,

    visitorSelector,
    visitorNickSelector,
    visitorUrlPictureSelector,
    visitorMailSelector,     
    visitorCitySelector,

    isOrganizerSelector,
    infoSelector,
    organizationNameSelector,
    organizationLinkSelector,
    organizationLogoSelector,
    countSubSelector,

    errorReg: errorRegSelector,
    redirectToLoginAfterSuccessReg: redirectToLoginAfterSuccessRegSelector,
};
//=================================================

//====================exports====================
export { selectors as authSelectors };
export { thunks as authThunks };
export { actions as authActions };
export { reducer as authReducer };
//===============================================