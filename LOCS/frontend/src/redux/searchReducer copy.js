import { searchAPI } from '../api/api';

const UPDATE_QUERY_TEXT = 'UPDATE_QUERY_TEXT';
const UPDATE_QUERY_TEXT_FOR_USERS = 'UPDATE_QUERY_TEXT_FOR_USERS';
const UPDATE_CURRENT_QUERY_TEXT = 'UPDATE_CURRENT_QUERY_TEXT';
const UPDATE_RESULT_SEARCH = 'UPDATE_RESULT_SEARCH';
const UPDATE_RESULT_EVENTS_SEARCH = 'UPDATE_RESULT_EVENTS_SEARCH';
const UPDATE_RESULT_ORG_SEARCH = 'UPDATE_RESULT_ORG_SEARCH';
const UPDATE_IS_SEARCH = 'UPDATE_IS_SEARCH';
const SEARCH_CLEAR = 'SEARCH_CLEAR';
const UPDATE_PAGES = 'UPDATE_PAGES';
const UPDATE_TYPE_SEARCH = 'UPDATE_TYPE_SEARCH';

const initialState = {
    queryText: '',
    currentQueryText: '',
    queryTextForUsers: '',
    resultSearch: null,
    resultEventsSearch: null,
    resultOrgSearch: null,
    resultSize: null,
    isSearch: false,
    typeSearch: null,
    pages: []
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_QUERY_TEXT:
            return {
                ...state,
                queryText: action.queryText
            };
        case UPDATE_TYPE_SEARCH:
            return {
                ...state,
                typeSearch: action.typeSearch
            };
        case UPDATE_QUERY_TEXT_FOR_USERS:
            return {
                ...state,
                queryTextForUsers: action.queryText
            };
        case SEARCH_CLEAR:
            return initialState;
        case UPDATE_CURRENT_QUERY_TEXT:
            return {
                ...state,
                currentQueryText: action.currentQueryText
            };
        case UPDATE_RESULT_SEARCH:
            return {
                ...state,
                resultSearch: action.resultSearch,
                resultSize: action.resultSize,
                isSearch: true
            };
        case UPDATE_RESULT_EVENTS_SEARCH:
            return {
                ...state,
                resultEventsSearch: action.resultSearch,
                resultSize: action.resultSize,
                isSearch: true
            };
        case UPDATE_RESULT_ORG_SEARCH:
            return {
                ...state,
                resultOrgSearch: action.resultSearch,
                resultSize: action.resultSize,
                isSearch: true
            };
        case UPDATE_IS_SEARCH:
            return {
                ...state,
                isSearch: action.isSearch,
            }
        case UPDATE_PAGES:
            let newPages = [];
            for (let i = 1; i <= Math.ceil(action.count / 3); i++) {
				newPages = [...newPages, i];
            }
            return {
                ...state,
                pages: newPages,
            }
        default:
            return state;
    }
}

export const SearchUsersByNickThunk = (pageSize, pageNum, nick) => async (dispatch) => {
    const resultSearch = await searchAPI.SearchUsersByNick(nick, pageSize, pageNum);
    dispatch(updateResultSearch(resultSearch.data, resultSearch.count));
    dispatch(updateCurrentQueryText(nick));
}

export const updateResultSearch = (resultSearch, resultSize) => ({
    type: UPDATE_RESULT_SEARCH,
    resultSearch: resultSearch,
    resultSize: resultSize
});
export const updateResultEventsSearch = (resultSearch, resultSize) => ({
    type: UPDATE_RESULT_EVENTS_SEARCH,
    resultSearch: resultSearch,
    resultSize: resultSize
});
export const updateResultOrgSearch = (resultSearch, resultSize) => ({
    type: UPDATE_RESULT_ORG_SEARCH,
    resultSearch: resultSearch,
    resultSize: resultSize
});

export const updateCurrentQueryText = (currentQueryText) => ({
    type: UPDATE_CURRENT_QUERY_TEXT,
    currentQueryText: currentQueryText
});
// export const updateQueryTextForUsers = (currentQueryText) => ({
//     type: UPDATE_CURRENT_QUERY_TEXT_FOR_USERS,
//     currentQueryText: currentQueryText
// });

export const updateQueryText = (queryText) => ({
    type: UPDATE_QUERY_TEXT,
    queryText: queryText
});
export const searchClear = () => ({
    type: SEARCH_CLEAR
});

export const updateIsSearch = (isSearch) => ({
    type: UPDATE_IS_SEARCH,
    isSearch: isSearch
});
export const updatePages = (count) => ({
    type: UPDATE_PAGES,
    count: count
});
export const updateTypeSearch = (typeSearch) => ({
    type: UPDATE_TYPE_SEARCH,
    typeSearch: typeSearch
});



export default searchReducer;