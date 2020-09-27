import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { normalizeEventsList } from '~/helpers/normalizeEvents';

const MOCK_EVENTS = {
    count: 5,
    Events: [
        {
            eventshortlist: {
                id: 1,
                name: 'Крутая туса',
                info: 'Новая крутая туса, где будет что-то интересное',
                image: null
            },
            tags: [1, 2, 3, 4]
        },
        {
            eventshortlist: {
                id: 2,
                name: 'Ещё одна крутая туса',
                info: 'Это уже какая-то другая туса, с соверщенно другим описанием',
                image: null
            },
            tags: [5, 2, 3, 10]
        },
        {
            eventshortlist: {
                id: 3,
                name: 'А это туса с длинным названием для того, чтобы проверить, как будет выглядеть',
                info: 'Уникальное описание для тусы с очень длинным названием, таким длинным, что было сложно придумать более длинное описание',
                image: null
            },
            tags: [1, 2, 10, 11]
        },
        {
            eventshortlist: {
                id: 4,
                name: 'Событие с другим названием',
                info: 'Для того, чтобы было какое-то разнообразие',
                image: null
            },
            tags: [1, 2, 5, 7]
        },
        {
            eventshortlist: {
                id: 5,
                name: 'Последнее событие',
                info: 'Надоело придумывать эти события, хватит и столько',
                image: null
            },
            tags: [6, 7, 8, 9]
        },
    ]
}

//====================slice-name====================
const SLICE_NAME = 'eventsListMain';
//==================================================

//====================thunks====================
const thunks = {
    fetchEvents: createAsyncThunk(
        `${SLICE_NAME}/fetchEventsStatus`,
        async () => {
            return { events: MOCK_EVENTS };
        }
    )
};
//==============================================

//====================case-reducers bodys====================
const eventsChange = (state, action) => {
    const { events } = action.payload;

    const { byId, allIds } = events.reduce((acc, event) => {
        const { id, ...outher } = event;
        return {
            byId: {...acc.byId, [String(id)]: outher},
            allIds: acc.allIds.concat(id)
        };
    }, { byId: {}, allIds: [] });

    state.byId = byId;
    state.allIds = allIds;
}
//===========================================================

//====================slice====================
const { actions, reducer } = createSlice({
    name: SLICE_NAME,
    initialState: {
        byId: null,
        allIds: null,
        isLoading: null
    },
    reducers: {
        eventsChange: eventsChange,
    },
    extraReducers: {
        [thunks.fetchEvents.pending]: (state) => {
            state.isLoading = true;
        },
        [thunks.fetchEvents.fulfilled]: (state, action) => {
            const { payload, ...outher } = action;
            const { events } = payload;

            const normalizeEvents = normalizeEventsList(events);
            eventsChange(state, {
                ...outher, 
                payload: { events: normalizeEvents }
            });

            state.isLoading = false;
        }
    }
});
//=============================================

//====================selectors====================
const eventsObject = state => state.eventsListMain.byId;

const events = state => {
    const events = eventsObject(state);
    
    if(!events) return null;

    const eventsArray = Object.keys(events).map(
        id => ({ id: id, ...events[id] })
    );

    return eventsArray;
};

const isLoading = state => state.eventsListMain.isLoading;

const selectors = {
    events,
    isLoading,
};
//=================================================

//====================exports====================
export { selectors as eventsListMainSelectors };
export { thunks as eventsListMainThunks };
export { actions as eventsListMainActions };
export { reducer as eventsListMainReducer };
//===============================================
