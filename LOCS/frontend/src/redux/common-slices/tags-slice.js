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

const SLICE_NAME = 'tags';

const thunks = {
    fetchTags: createAsyncThunk(
        `${SLICE_NAME}/fetchTagsStatus`,
        async () => {
            return { tags: MOCK_TAGS };
        }
    )
};

const { actions, reducer } = createSlice({
    name: SLICE_NAME,
    initialState: {
        byId: null,
        allIds: null,
        isLoading: false
    },
    reducers: {
        tagsChange: (state, action) => {
            const { tags } = action.payload;

            const { byId, allIds } = tags.reduce((acc, tag) => {
                const { id, ...outher } = tag;
                return {
                    byId: acc.byId.set(id, outher),
                    allIds: acc.allIds.concat(id)
                };
            }, { byId: new Map(), allIds: [] });

            state.byId = byId;
            state.allIds = allIds;
        },
    },
    extraReducers: {
        [thunks.fetchTags.pending]: (state) => {
            state.isLoading = true;
        },
        [thunks.fetchTags.fulfilled]: (state, action) => {
            const { tags } = action.payload;

            const { byId, allIds } = tags.reduce((acc, tag) => {
                const { id, ...outher } = tag;
                return {
                    byId: acc.byId.set(id, outher),
                    allIds: acc.allIds.concat(id)
                };
            }, { byId: new Map(), allIds: [] });

            state.byId = byId;
            state.allIds = allIds;
            state.isLoading = false;
        }
    }
});

const tagsMapSelector = state => state.tags.byId;

const tagsSelector = state => {
    const tagsMap = tagsMapSelector(state);
    
    if(!tagsMap) return null;

    return (
        Array.from(
            tagsMap.entries()
        ).map( tag => ({ id: tag[0], ...tag[1] }))
    );
};

const isLoadingSelector = state => state.tags.isLoading;

const selectors = {
    tagsSelector,
    isLoadingSelector,
};

export { selectors as tagsSelectors };
export { thunks as tagsThunks };
export { actions as tagsActions };
export { reducer as tagsReducer };