import React from 'react';
import classNames from 'classnames';
import style from './style.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectedTagsSelectors,
    selectedTagsActions,
} from '~/redux/common-slices';
import { ButtonGray, ButtonCustom } from '~/ui';

const ListTags = ({ tags, onClickTagToggle }) => (
    <ul className={style['component__list']}>
        {tags.map(
            tag => (
                <li
                    key={tag.id}
                    className={style['component__tag']}
                >
                    <div 
                        className={style['component__tag-name']}
                        title={tag.name}
                    >
                        {tag.name}
                    </div>
                    <ButtonCustom
                        className={style['component__button-cancel']}
                        onClick={onClickTagToggle(tag.id)}
                    >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.38464 1.96143L10.2693 10.9614" stroke="#4F4F4F" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
                            <path d="M10.2693 1.96143L1.38464 10.9614" stroke="#4F4F4F" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
                        </svg>
                    </ButtonCustom>
                </li>
            )
        )}
    </ul>
);

const SelectedTagsListView = ({ 
    selectedTags,
    onClickTagToggle,
    onClickSelectedTagsClear 
}) => {
    const isVisibleList = selectedTags.length > 0;

    return (
        <div
            className={classNames(
                style['component'],
                { [style['component_visible']]: isVisibleList },
                { [style['component_invisible']]: !isVisibleList }
            )}
        >
            <ButtonGray
                onClick={onClickSelectedTagsClear}
            >
                Сбросить всё
            </ButtonGray>
            <ListTags
                tags={selectedTags}
                onClickTagToggle={onClickTagToggle}
            />
        </div>
    );
}

export const SelectedTagsList = () => {
    const selectedTags = useSelector(selectedTagsSelectors.selectedTagsSelector);
    const dispatch = useDispatch();

    const onClickTagToggle = (id) => () => dispatch(
        selectedTagsActions.tagToggle({ id })
    );
    const onClickSelectedTagsClear = () => dispatch(
        selectedTagsActions.selectedTagsClear()
    );

    return (
        <SelectedTagsListView
            selectedTags={selectedTags}
            onClickTagToggle={onClickTagToggle}
            onClickSelectedTagsClear={onClickSelectedTagsClear}
        />
    );
}