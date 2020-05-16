const SET_PATH_BACK = 'SET_PATH_BACK';

const initialState = {
    path: '/'
}

export const backButtonReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PATH_BACK:
            return { ...state, path: action.path };
        default:
            return state;
    }
}

export const setPathBack = (path) => {
    return { type: SET_PATH_BACK, path: path };
}