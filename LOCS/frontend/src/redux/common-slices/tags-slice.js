import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const MOCK_TAGS = [
    {id: 1, name: 'Театры'},
    {id: 2, name: 'Концерты'},
    {id: 3, name: 'Мюзиклы'},
    {id: 4, name: 'Для детей'},
    {id: 5, name: 'Живой звук'},
    {id: 6, name: 'Известные люди'},
    {id: 7, name: 'Городние события'},
    {id: 8, name: 'Новый год'},
    {id: 9, name: 'У меня кончилась фантазия'},
    {id: 10, name: 'Правда кончилась, больше ничего не придумаю'},
    {id: 11, name: 'Аааа, да сколько можно'},
    {id: 12, name: 'Мне надоело их придумывать'},
];

//====================slice-name====================
const SLICE_NAME = 'tags';
//==================================================

//====================thunks====================
const thunks = {
    fetchTags: createAsyncThunk(
        `${SLICE_NAME}/fetchTagsStatus`,
        async () => {
            return { tags: MOCK_TAGS };
        }
    )
};
//==============================================

//====================case-reducers bodys====================
const tagsChange = (state, action) => {
    const { tags } = action.payload;

    const { byId, allIds } = tags.reduce((acc, tag) => {
        const { id, ...outher } = tag;
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
        isLoading: false
    },
    reducers: {
        tagsChange: tagsChange,
    },
    extraReducers: {
        [thunks.fetchTags.pending]: (state) => {
            state.isLoading = true;
        },
        [thunks.fetchTags.fulfilled]: (state, action) => {
            tagsChange(state, action);
            state.isLoading = false;
        }
    }
});
//=============================================

//====================selectors====================
const tagsObjectSelector = state => state.tags.byId;

const tagsSelector = state => {
    const tagsObject = tagsObjectSelector(state);
    
    if(!tagsObject) return null;

    const tagsArray = Object.keys(tagsObject).map(
        id => ({ id: +id, ...tagsObject[id] })
    );

    return tagsArray;
};

const isLoadingSelector = state => state.tags.isLoading;

const selectors = {
    tagsSelector,
    isLoadingSelector,
};
//=================================================

//====================exports====================
export { selectors as tagsSelectors };
export { thunks as tagsThunks };
export { actions as tagsActions };
export { reducer as tagsReducer };
//===============================================