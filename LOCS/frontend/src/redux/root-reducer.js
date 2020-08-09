import { combineReducers } from "redux";
import { selectedTagsReducer } from './common-slices/selected-tags-slice';
import { tagsReducer } from './common-slices/tags-slice';

export const rootReducer = combineReducers({
    tags: tagsReducer,
    selectedTags: selectedTagsReducer,
});