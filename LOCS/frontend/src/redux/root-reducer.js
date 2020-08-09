import { combineReducers } from "redux";
import { selectedTagsReducer } from './common-slices';
// import { filterTagsReducer } from "~/features/filter-tags";

export const rootReducer = combineReducers({
    selectedTags: selectedTagsReducer
});