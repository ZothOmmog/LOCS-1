import { createReducer } from './createReducer';
import { actionTypesSearch as actionTypes } from '../actions';

//TODO убрать visitors и events, оставить только result и сделать меню фильтрации через reselect
const initialState = {
    visitors: null,
    events: null,
    organizers: null,

    visitorsCurrentPage: 1,
    eventsCurrentPage: 1,
    organizersCurrentPage: 1,
    
    visitorsCount: 0,
    eventsCount: 0,
    organizersCount: 0,
    
    query: null
}

const search = {
    [actionTypes.SET_QUERY]: (state, action) => ({
        ...state,
        query: action.query
    }),

    [actionTypes.SET_EVENTS]: (state, action) => ({
        ...state,
        events: action.events
    }),
    [actionTypes.SET_VISITORS]: (state, action) => ({
        ...state,
        visitors: action.visitors
    }),
    [actionTypes.SET_ORGANIZERS]: (state, action) => ({
        ...state,
        organizers: action.organizers
    }),

    [actionTypes.SET_EVENTS_CURRENT_PAGE]: (state, action) => ({
        ...state,
        eventsCurrentPage: action.eventsCurrentPage
    }),
    [actionTypes.SET_VISITORS_CURRENT_PAGE]: (state, action) => ({
        ...state,
        visitorsCurrentPage: action.visitorsCurrentPage
    }),
    [actionTypes.SET_ORGANIZERS_CURRENT_PAGE]: (state, action) => ({
        ...state,
        organizersCurrentPage: action.organizersCurrentPage
    }),

    [actionTypes.SET_EVENTS_COUNT]: (state, action) => ({
        ...state,
        eventsCount: action.eventsCount
    }),
    [actionTypes.SET_VISITORS_COUNT]: (state, action) => ({
        ...state,
        visitorsCount: action.visitorsCount
    }),
    [actionTypes.SET_ORGANIZERS_COUNT]: (state, action) => ({
        ...state,
        organizersCount: action.organizersCount
    }),
}

export const searchReducer = createReducer(initialState, search);