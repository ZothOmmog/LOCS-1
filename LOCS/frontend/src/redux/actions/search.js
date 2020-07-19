import { searchAPI } from '../../api/api';
import { 
    normalizeEvents,
    normalizeOrganizers
} from '../../helpers';

export const actionTypes = {
    SET_VISITORS: 'SET_VISITORS',
    SET_ORGANIZERS: 'SET_ORGANIZERS',
    SET_EVENTS: 'SET_EVENTS',

    SET_VISITORS_CURRENT_PAGE: 'SET_VISITORS_CURRENT_PAGE',
    SET_ORGANIZERS_CURRENT_PAGE: 'SET_ORGANIZERS_CURRENT_PAGE',
    SET_EVENTS_CURRENT_PAGE: 'SET_EVENTS_CURRENT_PAGE',

    SET_VISITORS_COUNT: 'SET_VISITORS_COUNT',
    SET_ORGANIZERS_COUNT: 'SET_ORGANIZERS_COUNT',
    SET_EVENTS_COUNT: 'SET_EVENTS_COUNT',

    SET_QUERY: 'SET_QUERY',
}

const setVisitors = (visitors) => ({ type: actionTypes.SET_VISITORS, visitors: visitors });
const setOrganizers = (organizers) => ({ type: actionTypes.SET_ORGANIZERS, organizers: organizers });
const setEvents = (events) => ({ type: actionTypes.SET_EVENTS, events: events });

const setVisitorsCurrentPage = (visitorsCurrentPage) => ({ type: actionTypes.SET_VISITORS_CURRENT_PAGE, visitorsCurrentPage: visitorsCurrentPage });
const setOrganizersCurrentPage = (organizersCurrentPage) => ({ type: actionTypes.SET_ORGANIZERS_CURRENT_PAGE, organizersCurrentPage: organizersCurrentPage });
const setEventsCurrentPage = (eventsCurrentPage) => ({ type: actionTypes.SET_EVENTS_CURRENT_PAGE, eventsCurrentPage: eventsCurrentPage });

const setVisitorsCount = (visitorsCount) => ({ type: actionTypes.SET_VISITORS_COUNT, visitorsCount: visitorsCount });
const setOrganizersCount = (organizersCount) => ({ type: actionTypes.SET_ORGANIZERS_COUNT, organizersCount: organizersCount });
const setEventsCount = (eventsCount) => ({ type: actionTypes.SET_EVENTS_COUNT, eventsCount: eventsCount });

export const setQuery = (query) => ({ type: actionTypes.SET_QUERY, query: query });

export const searchThunk = (pageSize) => async (dispatch, getState) => {
    const { auth: { isAuth }, search: { query, visitorsCurrentPage, eventsCurrentPage, organizersCurrentPage } } = getState();

    // const visitorsFromServer = isAuth ? await searchAPI.searchUsersByNick(query, pageSize, visitorsCurrentPage) : [];
    const organizersFromServer = await searchAPI.searchOrganizerByName(query, pageSize, organizersCurrentPage);
    const eventsFromServer = await searchAPI.searchEventsByName(query, pageSize, eventsCurrentPage);

    //TODO Дописать нормализацию для посетителей и добавить их в результат
    const organizers = normalizeOrganizers(organizersFromServer.data);
    const events = normalizeEvents(eventsFromServer.data);

    dispatch( setOrganizers(organizers) );
    dispatch( setEvents(events) );

    dispatch( setOrganizersCount(organizersFromServer.count) );
    dispatch( setEventsCount(eventsFromServer.count) );
}

export const changeOrganizersCurrentPageThunk = (pageSize, currentPage) => async (dispatch, getState) => {
    const { search: { query } } = getState();

    const organizersFromServer = await searchAPI.searchOrganizerByName(query, pageSize, currentPage);
    const organizers = normalizeOrganizers(organizersFromServer.data);

    dispatch( setOrganizers(organizers) );
}

export const changeEventsCurrentPageThunk = (pageSize, currentPage) => async (dispatch, getState) => {
    const { search: { query } } = getState();

    const eventsFromServer = await searchAPI.searchOrganizerByName(query, pageSize, currentPage);
    const events = normalizeEvents(eventsFromServer.data);

    dispatch( setOrganizers(events) );
}