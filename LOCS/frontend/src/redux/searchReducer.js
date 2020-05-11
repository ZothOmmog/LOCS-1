import { searchAPI } from '../api/api';

const UPDATE_QUERY_TEXT = 'UPDATE_QUERY_TEXT';
const UPDATE_CURRENT_QUERY_TEXT = 'UPDATE_CURRENT_QUERY_TEXT';
const UPDATE_RESULT_SEARCH = 'UPDATE_RESULT_SEARCH';
const UPDATE_IS_SEARCH = 'UPDATE_IS_SEARCH';
const SEARCH_CLEAR = 'SEARCH_CLEAR';

const initialState = {
    queryText: '',
    currentQueryText: '',
    resultSearch: null,
    resultSize: null,
    isSearch: false
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_QUERY_TEXT:
            return {
                ...state,
                queryText: action.queryText
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
        case UPDATE_IS_SEARCH:
            return {
                ...state,
                isSearch: action.isSearch,
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

const updateResultSearch = (resultSearch, resultSize) => ({
    type: UPDATE_RESULT_SEARCH,
    resultSearch: resultSearch,
    resultSize: resultSize
});

export const updateCurrentQueryText = (currentQueryText) => ({
    type: UPDATE_CURRENT_QUERY_TEXT,
    currentQueryText: currentQueryText
});

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

export default searchReducer;