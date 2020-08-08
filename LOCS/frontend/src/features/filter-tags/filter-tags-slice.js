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

//TODO тут надо реализовать нормальную логику отправки запроса
export const fetchTags = createAsyncThunk(
    'filterTags/fetchTagsStatus',
    async () => {
        return { tags: MOCK_TAGS };
    }
);

const { actions, reducer } = createSlice({
    name: 'filterTags',
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
        [fetchTags.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchTags.fulfilled]: (state, action) => {
            const { tags } = action.payload;
            state.tags = tags;
            state.isLoading = false;
        }
    }
});

export const tagsSelector = state => state.filterTags.tags;
export const selectedTagsIdSelector = state => state.filterTags.selectedTagsId;
export const isLoadingSelector = state => state.filterTags.isLoading;
export const selectedTagsSelector = createSelector(
    tagsSelector,
    selectedTagsIdSelector,
    (tags, selectedTagsId) => selectedTagsId.map(
        id => tags.find(
            tag => tag.id === id
        )
    ),
);

export const { tagToggle, tagsChange, selectedTagsClear } = actions;
export { reducer as filterTagsReducer };