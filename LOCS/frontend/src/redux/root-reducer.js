import { combineReducers } from "redux";
import { selectedTagsReducer } from './common-slices/selected-tags-slice';
import { tagsReducer } from './common-slices/tags-slice';
import { authReducer } from './common-slices/auth-slice';
import { organizerEventsReducer } from './common-slices/organizer-events-slice';
import { searchAddressReducer } from './common-slices/search-address-slice';
import { eventsListMainReducer } from "~/pages/main-page/event-list-main";
import { myEventsListReducer } from "~/pages/profile-organizer-events-list-page/my-events-list-slice";

export const rootReducer = combineReducers({
    tags: tagsReducer,
    selectedTags: selectedTagsReducer,
    auth: authReducer,
    organizerEvents: organizerEventsReducer,
    searchAddress: searchAddressReducer,
    eventsListMain: eventsListMainReducer,
    myEventsList: myEventsListReducer
});