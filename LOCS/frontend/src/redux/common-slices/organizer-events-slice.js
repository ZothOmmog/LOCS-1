import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { organizerApi } from '~/api';

//====================slice-name====================
const SLICE_NAME = 'organizerEvents';
//==================================================

//====================thunks====================
const thunks = {
    fetchCreate: createAsyncThunk(
        `${SLICE_NAME}/fetchCreate`,
        async ({idAddress, name, info, tags, timestamp, price, link}) => {
            return await organizerApi.createEvent(idAddress, name, info, +price, link, tags, timestamp);
        }
    )
}
//==============================================

//====================initialState====================
const initialState = {
    isCreatingEvent: false
};
//====================================================

//====================helpers====================
//===============================================

//====================slice====================
const { actions, reducer } = createSlice({
    name: SLICE_NAME,
    initialState: initialState,
    reducers: {
    
    },
    extraReducers: {
        [thunks.fetchCreate.pending]: (state) => {
            state.isCreatingEvent = true;
        },
        [thunks.fetchCreate.fulfilled]: (state) => {
            state.isCreatingEvent = false;
        }
    }
});
//=============================================

//====================selectors====================
const sliceSelector = (state) => state.organizerEvents;
const isCreatingEventSelector = (state) => sliceSelector(state).isCreatingEvent;

const selectors = {
    isCreatingEvent: isCreatingEventSelector
};
//=================================================

//====================exports====================
export { selectors as organizerEventsSelectors };
export { thunks as organizerEventsThunks };
export { actions as organizerEventsActions };
export { reducer as organizerEventsReducer };
//===============================================