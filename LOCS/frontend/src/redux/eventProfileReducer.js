const SET_CURRENT_EVENT = 'SET_CURRENT_EVENT';
const REMOVE_CURRENT_EVENT = 'REMOVE_CURRENT_EVENT';

const initialState = {
    currentEvent: {
        id: null,
        name: null,
        type: null,
        info: null
    }
}

const eventProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_EVENT:
            return { ...state, currentEvent: action.event };
        case REMOVE_CURRENT_EVENT:
            return { ...state, currentEvent: { id: null, name: null, type: null, info: null } };
        default:
            return state;
    }
}

export const setCurrentEvent = (event) => {
    return { type: SET_CURRENT_EVENT, event: event };
}

export const removeCurrentEvent = () => {
    return { type: REMOVE_CURRENT_EVENT };
}

export default eventProfileReducer;