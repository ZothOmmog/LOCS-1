import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eventAPI } from '~/api';

const MOCK_EVENTS = [
    {
        id: 1,
        name: 'Крутая туса',
        info: 'Новая крутая туса, где будет что-то интересное',
        image: null,
        date: new Date(2020, 12, 1, 19, 30, 0),
        idAddress: null,
        tags: [1, 2, 3, 4]
    },
    {
        id: 2,
        name: 'Ещё одна крутая туса',
        info: 'Это уже какая-то другая туса, с соверщенно другим описанием',
        image: null,
        date: new Date(2020, 11, 20, 18, 0, 0),
        idAddress: null,
        tags: [5, 2, 3, 10]
    },
    {
        id: 3,
        name: 'А это туса с длинным названием для того, чтобы проверить, как будет выглядеть',
        info: 'Уникальное описание для тусы с очень длинным названием, таким длинным, что было сложно придумать более длинное описание',
        image: null,
        date: new Date(2020, 12, 11, 21, 40, 0),
        idAddress: null,
        tags: [1, 2, 10, 11]
    },
    {
        id: 4,
        name: 'Событие с другим названием',
        info: 'Для того, чтобы было какое-то разнообразие',
        image: null,
        date: new Date(2020, 12, 23, 15, 30, 0),
        idAddress: null,
        tags: [1, 2, 5, 7]
    },
    {
        id: 5,
        name: 'Последнее событие',
        info: 'Надоело придумывать эти события, хватит и столько',
        image: null,
        date: new Date(2020, 12, 1, 19, 30, 0),
        idAddress: null,
        tags: [6, 7, 8, 9]
    }
]

//====================slice-name====================
const SLICE_NAME = 'eventsListMain';
//==================================================

//====================thunks====================
const thunks = {
    fetchEvents: createAsyncThunk(
        `${SLICE_NAME}/fetchEventsStatus`,
        async (_arg, thunkAPI) => {
            const state = thunkAPI.getState();
            const onePageSize = onePageSizeSelector(state);
            const currentPage = currentPageSelector(state);

            return await eventAPI.getEvents(currentPage, onePageSize);
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
        onePageSize: 12,
        currentPage: 0,
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
            const events = payload;
            eventsChange(state, {
                ...outher, 
                payload: { events }
            });

            state.isLoading = false;
        },
        [thunks.fetchEvents.rejected]: (state, action) => {
            const { payload, ...outher } = action;
            console.error('Запрос к серверу для получения списка событий провалился, был загружен фейковый список');
            eventsChange(state, {
                ...outher, 
                payload: { events: MOCK_EVENTS }
            });

            state.isLoading = false;
        }
    }
});
//=============================================

//====================selectors====================
function sliceSelector (state) { return state.eventsListMain; }

const eventsObjectSelector = state => sliceSelector(state).byId;

const eventsSelector = state => {
    const events = eventsObjectSelector(state);
    
    if(!events) return null;

    const eventsArray = Object.keys(events).map(
        id => ({ id: id, ...events[id] })
    );

    return eventsArray;
};

const isLoadingSelector = state => sliceSelector(state).isLoading;
function onePageSizeSelector (state) { return sliceSelector(state).onePageSize; }
function currentPageSelector (state) { return sliceSelector(state).currentPage; }

const selectors = {
    events: eventsSelector,
    isLoading: isLoadingSelector,
    onePageSize: onePageSizeSelector,
    currentPage: currentPageSelector
};
//=================================================

//====================exports====================
export { selectors as eventsListMainSelectors };
export { thunks as eventsListMainThunks };
export { actions as eventsListMainActions };
export { reducer as eventsListMainReducer };
//===============================================
