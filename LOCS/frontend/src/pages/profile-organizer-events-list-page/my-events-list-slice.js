import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { organizerApi } from "~/api";

const adapter = createEntityAdapter({
    selectId: event => event.id,
    sortComparer: (eventA, eventB) => eventA.name.localeCompare(eventB.name)
});

const { actions, reducer } = createSlice({
    initialState: adapter.getInitialState({
        pageSize: 4,
        pageNumber: 0,
        total: 0
    }),
    name: 'myEventsList',
    reducers: {
        eventsChanged(state, action) {
            const { events, count, newPageNumber } = action.payload;
            adapter.setAll(state, events);
            state.total = count;
            state.pageNumber = newPageNumber;
        }
    }
});

const sliceSelector = state => state.myEventsList;
const selectors = {
    ...adapter.getSelectors(sliceSelector),
    pageInfo: state => ({
        pageSize: sliceSelector(state).pageSize,
        pageNumber: sliceSelector(state).pageNumber,
        total: sliceSelector(state).total
    }),
};

const fetchMyEvents = (newPageNumber = 1, required = false) => async (dispatch, getState) => {
    const { pageSize, pageNumber } = selectors.pageInfo(getState());
    
    if (newPageNumber === pageNumber && !required) return;
    
    const { events, count } = await organizerApi.getMyEvents(pageSize, newPageNumber);
    dispatch(actions.eventsChanged({ events, count, newPageNumber }));
}

const thunks = {
    fetchMyEvents,
    fetchRemoveEvent: eventId => async (dispatch) => {
        const result = await organizerApi.deleteEvent(eventId);
        if (result) {
           dispatch(fetchMyEvents(1, true));
        }
        else {
            throw new Error('ошибка при удалении события');
        }
    }
};

export {
    actions as myEventsListActions,
    reducer as myEventsListReducer,
    selectors as myEventsListSelectors,
    thunks as myEventsListThunks
};