import { combineReducers } from "redux";
import { filterTagsReducer } from "~/features/filter-tags";

export const rootReducer = combineReducers({
    filterTags: filterTagsReducer
});