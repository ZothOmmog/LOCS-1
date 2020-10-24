import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addressApi } from '~/api/AddressApi';

//====================slice-name====================
const SLICE_NAME = 'searchAddress';
//==================================================

//====================thunks====================
const thunks = {
    fetchSearch: createAsyncThunk(
        `${SLICE_NAME}/fetchSearch`,
        async word => {
            const addresses = await addressApi.search(word);
            return addresses;
        }
    )
}
//==============================================

//====================initialState====================
const initialState = {
    addresses: [],
    isLoadingAddresses: false
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
        [thunks.fetchSearch.pending]: state => {
            state.isLoadingAddresses = true;
        },
        [thunks.fetchSearch.fulfilled]: (state, action) => {
            const addresses = action.payload;
            state.addresses = addresses;
            state.isLoadingAddresses = false;
        }
    }
});
//=============================================

//====================selectors====================
const sliceSelector = state => state.searchAddress;
const addressesSelector = state => sliceSelector(state).addresses;
const isLoadingAddressesSelector = state => sliceSelector(state).isLoadingAddresses;

const selectors = {
    addressesSelector,
    isLoadingAddressesSelector
};
//=================================================

//====================exports====================
export { selectors as searchAddressSelectors };
export { thunks as searchAddressThunks };
export { actions as searchAddressActions };
export { reducer as searchAddressReducer };
//===============================================