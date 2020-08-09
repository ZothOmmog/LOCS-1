import React from 'react';
import style from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { 
    selectedTagsSelectors,
    selectedTagsActions,
} from '~/redux/common-slices/selected-tags-slice';
import { 
    tagsThunks,
    tagsSelectors
} from '~/redux/common-slices/tags-slice';
import { ButtonBordered, Navbar } from '~/ui';
import { useEffect } from 'react';
import { FilterTagsListSelect } from './filter-tags-list-select';

const ToggleTagsMenuView = (props) => {
    const {
        tags,
        selectedTagsId,
        onClickTagToggle,
        onClickSelectedTagsClear,
        isLoading,
        HINT_ALL, 
    } = props;

    const startToggls = tags ? tags.slice(0, 2) : [];
    const endToggls = tags ? tags.slice(2) : [];

    const startTogglsUi = startToggls.map(tag => (
        <ButtonBordered
            title={tag.name}
            onClick={onClickTagToggle(tag.id)}
            className={style['filter-tags-toggle__button-bordered']}
            active={selectedTagsId.includes(tag.id)}
        >
            {tag.name}
        </ButtonBordered>
    ));
    
    const TogglelistUi = !isLoading ? (
        <Navbar>
            <ButtonBordered
                onClick={onClickSelectedTagsClear}
                active={selectedTagsId.length === 0}
            >
                {HINT_ALL}
            </ButtonBordered>

            {startTogglsUi[0]}

            {startTogglsUi[1]}

            <FilterTagsListSelect
                onClickTagToggle={onClickTagToggle}
                selectedTagsId={selectedTagsId}
                tagList={endToggls}
            />
        </Navbar>
    ) : <div className={style['loader']}>Идет загрузка тэгов...</div>;

    return (
        TogglelistUi
    );
};

export const ToggleTagsMenu = () => {
    const dispatch = useDispatch();
    const tags = useSelector(tagsSelectors.tagsSelector);
    const selectedTagsId = useSelector(selectedTagsSelectors.selectedTagsIdSelector);
    const isLoading = useSelector(tagsSelectors.isLoadingSelector);

    useEffect(() => {
        dispatch(
            tagsThunks.fetchTags()
        );
    }, [dispatch]);

    const onClickTagToggle = id => () => dispatch(
        selectedTagsActions.tagToggle({ id })
    );

    const onClickSelectedTagsClear = () => dispatch(
        selectedTagsActions.selectedTagsClear()
    );

    return (
        <ToggleTagsMenuView
            tags={tags}
            selectedTagsId={selectedTagsId}
            onClickTagToggle={onClickTagToggle}
            onClickSelectedTagsClear={onClickSelectedTagsClear}
            isLoading={isLoading}
            HINT_ALL='Все события'
        />
    );
}
