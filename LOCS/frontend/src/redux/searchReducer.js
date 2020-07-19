import { searchAPI } from '../api/api';

const SET_VISITORS = 'SET_RESULT';
const SET_ORGANIZERS = 'SET_RESULT';
const SET_EVENTS = 'SET_RESULT';
const SET_QUERY = 'SET_QUERY';

//TODO перенести все actons в соответствующую директорию
//TODO добавить выборку результатов поиска через reselect
const initialState = {
    visitors: null,
    result: null,
    query: null
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VISITORS:
            return {
                ...state,
                visitors: action.visitors
            };
        case SET_ORGANIZERS:
            return {
                ...state,
                organizers: action.organizers
            };
        case SET_EVENTS:
            return {
                ...state,
                events: action.events
            };
        case SET_QUERY:
            return {
                ...state,
                query: action.query
            };
        default:
            return state;
    }
}

export const searchThunk = (pageSize, currentPage) => async (dispatch, getState) => {
    const { auth: { isAuth }, search: { query } } = getState();

    const visitorsFromServer = isAuth && await searchAPI.searchUsersByNick(query, pageSize, currentPage);
    const organizersFromServer = await searchAPI.searchOrganizerByName(query, pageSize, currentPage);
    const eventsFromServer = await searchAPI.searchEventsByName(query, pageSize, currentPage);
    
    dispatch(setEvents(eventsFromServer.Events.map(event => ({
        id: event.searchevent.id,
        name: event.searchevent.name,
        info: event.searchevent.info,
        type: `${event.tags.reduce((acc, tag) => acc + ' ' + tag)}`,
    }))));
}

const setVisitors = (visitors) => ({ type: SET_VISITORS, visitors: visitors });
const setOrganizers = (organizers) => ({ type: SET_ORGANIZERS, organizers: organizers });
const setEvents = (events) => ({ type: SET_EVENTS, events: events });

export const setQuery = (query) => ({ type: SET_QUERY, query: query });

export default searchReducer;