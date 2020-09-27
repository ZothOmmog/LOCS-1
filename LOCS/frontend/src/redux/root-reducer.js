import { combineReducers } from "redux";
import { selectedTagsReducer } from './common-slices/selected-tags-slice';
import { tagsReducer } from './common-slices/tags-slice';
import { authReducer } from './common-slices/auth-slice';
import { eventsListMainReducer } from "~/pages/main-page/event-list-main";

export const rootReducer = combineReducers({
    tags: tagsReducer,
    selectedTags: selectedTagsReducer,
    auth: authReducer,
    eventsListMain: eventsListMainReducer
});