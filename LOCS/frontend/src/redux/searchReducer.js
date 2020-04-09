const UPDATE_QUERY_TEXT = "UPDATE-QUERY-TEXT";

const stateForTags = () => {
    return ["tag1", "tag2", "tag3", "tag4", "tag5"];
}

const initialState = {
    tags: stateForTags(),
    queryText: ""
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD-NEW-TAG":
            return {
                ...state,
                tags: [...state.tags, action.tag]
            };
        case "UPDATE-QUERY-TEXT":
            return {
                ...state,
                queryText: action.queryText
            };
        default:
            return state;
    }
}

export const updateQueryTextActionCreator = (queryText) => {
    return {
        type: UPDATE_QUERY_TEXT,
        queryText: queryText
    }
}

export default searchReducer;