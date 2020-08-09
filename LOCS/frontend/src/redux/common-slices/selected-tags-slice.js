import { createSlice, createSelector } from '@reduxjs/toolkit';
import { tagsSelectors } from './tags-slice';

const SLICE_NAME = 'selectedTags';

const { actions, reducer } = createSlice({
    name: SLICE_NAME,
    initialState: {
        allIds: [],
    },
    reducers: {
        tagToggle: (state, action) => {
            const { id } = action.payload;
            const { allIds } = state;

            const indexTag = allIds.indexOf(id);

            if(indexTag > -1) allIds.splice(indexTag, 1);
            else allIds.push(id);
        },
        selectedTagsClear: (state) => {
            state.allIds = []
        }
    }
});

const selectedTagsIdSelector = state => state.selectedTags.allIds;

const selectedTagsSelector = createSelector(
    tagsSelectors.tagsSelector, selectedTagsIdSelector,
    (tags, selectedTagsId) => selectedTagsId.map(
        id => tags.find(
            tag => tag.id === id
        )
    ),
);

const selectors = {
    selectedTagsIdSelector,
    selectedTagsSelector
};

export { selectors as selectedTagsSelectors };
export { actions as selectedTagsActions };
export { reducer as selectedTagsReducer };