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

const MOCK_ORGANIZER = {
    data: {
        id_user: 1,
        info: "Тестовая информация об организации с большим количеством текста для того, чтобы можно было проверить, как это будет выглядеть в верстке и убедиться, что ничего не плывёт, а если плывёт, то поравить, чтобы не плыло, вот, как-то так, надеюсь такого объема хватит, а то ещё больше придумывать мне будет точно лень.",
        organization_name: "Тестовая организация",
        organization_link: "https://github.com/ZothOmmog",
        logo: null,
        countSub: 0
    
    }
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
            const { Auth, ...outher } = MOCK_AUTH_TRUE;
            return { isAuth: Auth, visitor: outher, organizer: MOCK_ORGANIZER.data };
        }
    ),
    fetchLogin: createAsyncThunk(
        `${SLICE_NAME}/fetchLogin`,
        async ({ login, password }) => {
            const { Auth, ...outher } = MOCK_AUTH_TRUE;
            return (
                login === MOCK_USER.login && 
                password === MOCK_USER.password ? (
                    { isAuth: Auth, visitor: outher }
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
    isLoadingAuth: null,
    isLoadingLogin: null
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
            state.isLoadingAuth = false;
        },
    },
    extraReducers: {
        [thunks.fetchAuth.pending]: (state) => {
            state.isLoadingAuth = true;
        },
        [thunks.fetchAuth.fulfilled]: (state, action) => {
            setMe(state, action.payload);
            state.isLoadingAuth = false;
        },
        [thunks.fetchLogin.pending]: (state) => {
            state.isLoadingLogin = true;
        },
        [thunks.fetchLogin.fulfilled]: (state, action) => {
            setMe(state, action.payload);
            state.isLoadingLogin = false;
        }
    }
});
//=============================================

//====================selectors====================
const sliceSelector = state => state.auth;
const isAuthSelector = state => sliceSelector(state).isAuth;
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

const selectors = {
    isAuthSelector,
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
};
//=================================================

//====================exports====================
export { selectors as authSelectors };
export { thunks as authThunks };
export { actions as authActions };
export { reducer as authReducer };
//===============================================