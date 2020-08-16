import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const MOCK_AUTH = null;

const SLICE_NAME = 'auth';

//TODO реальизовать без mock
const thunks = {
    fetchAuth: createAsyncThunk(
        `${SLICE_NAME}/fetchAuth`,
        async () => {
            return { user: MOCK_AUTH };
        }
    )
};

const initialState = {
    user: {
        id: null,
        mail: null,
        nick: null,
        city: null,
        urlPicture: null
    },
    isAuth: false,
    isLoading: null
};

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
            const { user } = action.payload;

            if (user) {
                state.user = user;
                state.isAuth = true;
            }

            state.isLoading = false;
        }
    }
});

const isAuthSelector = state => state.auth.isAuth;
const isLoadingSelector = state => state.auth.isLoading;

const selectors = {
    isAuthSelector,
    isLoadingSelector,
};

export { selectors as authSelectors };
export { thunks as authThunks };
export { actions as authActions };
export { reducer as authReducer };