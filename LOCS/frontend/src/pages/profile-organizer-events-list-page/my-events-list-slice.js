import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { compareAsc } from 'date-fns';
import { organizerApi } from "~/api";

const adapter = createEntityAdapter({
    selectId: event => event.id,
    sortComparer: (eventA, eventB) => eventA.name.localeCompare(eventB.name)
});

const { actions, reducer } = createSlice({
    initialState: adapter.getInitialState({
        pageSize: 4,
        pageNumber: 1
    }),
    name: 'myEventsList',
    reducers: {
        eventsChanged: adapter.setAll
    }
});

const selectors = {
    ...adapter.getSelectors(),
    pageInfo: state => ({
        pageSize: state.myEventsList.pageSize,
        pageNumber: state.myEventsList.pageNumber
    }),
};

const thunks = {
    fetchMyEvents: () => async (dispatch, getState) => {
        const { pageSize, pageNumber } = selectors.pageInfo(getState());
        const { events } = await organizerApi.getMyEvents(pageSize, pageNumber);
        dispatch(actions.eventsChanged(events));
    }
};

export {
    actions as myEventsListActions,
    reducer as myEventsListReducer,
    selectors as myEventsListSelectors,
    thunks as myEventsListThunks
};