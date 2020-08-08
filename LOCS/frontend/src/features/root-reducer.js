import { combineReducers } from "redux";
import { filterTagsReducer } from "./filter-tags";

export const rootReducer = combineReducers({
    filterTags: filterTagsReducer
});