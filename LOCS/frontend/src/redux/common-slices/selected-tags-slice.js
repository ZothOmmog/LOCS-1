import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

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

const SLICE_NAME = 'selectedTags';

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
        tags: [],
        selectedTagsId: [],
        isLoading: false
    },
    reducers: {
        tagsChange: (state, action) => {
            const { tags } = action.payload;
            state.tags = tags;
        },
        tagToggle: (state, action) => {
            const { id } = action.payload;
            const { tags, selectedTagsId } = state;

            const indexTag = state.selectedTagsId.indexOf(id);

            if(indexTag > -1) selectedTagsId.splice(indexTag, 1);
            else {
                if(
                    tags.find(tag => tag.id === id)
                ) selectedTagsId.push(id);
            }
        },
        selectedTagsClear: (state) => {
            state.selectedTagsId = []
        }
    },
    extraReducers: {
        [thunks.fetchTags.pending]: (state) => {
            state.isLoading = true;
        },
        [thunks.fetchTags.fulfilled]: (state, action) => {
            const { tags } = action.payload;
            state.tags = tags;
            state.isLoading = false;
        }
    }
});

const tagsSelector = state => state.selectedTags.tags;
const selectedTagsIdSelector = state => state.selectedTags.selectedTagsId;
const isLoadingSelector = state => state.selectedTags.isLoading;
const selectedTagsSelector = createSelector(
    tagsSelector, selectedTagsIdSelector,
    (tags, selectedTagsId) => selectedTagsId.map(
        id => tags.find(
            tag => tag.id === id
        )
    ),
);

const selectors = { tagsSelector, selectedTagsIdSelector, isLoadingSelector, selectedTagsSelector };

export { thunks as selectedTagsThunks };
export { selectors as selectedTagsSelectors };
export { actions as selectedTagsActions };
export { reducer as selectedTagsReducer };