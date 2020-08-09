import React from 'react';
import classNames from 'classnames';
import style from './style.module.scss';
import { useState } from 'react';
import { ButtonBordered } from '~/ui';
import { useEffect } from 'react';

const TagList = ({
    tagList,
    selectedTagsId,
    onClickTagToggle
}) => (
    <ul className={style['component__list-tags']}>
        {tagList.length > 0 ? (tagList.map(tag => {
            const isSelected = selectedTagsId.includes(tag.id);
            return (
                <li 
                    key={tag.id} 
                    onClick={onClickTagToggle(tag.id)}
                    title={tag.name}
                    className={classNames(
                        style['component__tag'],
                        { [style['component__tag_selected']]: isSelected },
                        { [style['component__tag_not-selected']]: !isSelected }
                    )}
                >
                    {tag.name}
                </li>
            );
        })): (
            <div className={style['component__not-found']}>
                {'Таких тэгов не найдено :('}
            </div>
        )}
    </ul>
);

const FilterTagsListSelectView = ({
    tagList, 
    querySearch, 
    onChangeSetQuerySearch,
    onClickTagToggle, 
    onClickToggleOpenList,
    onAnimationEndSetIsDisplay,
    isDisplay,
    isListOpen,
    selectedTagsId
}) => (
    <>
        <ButtonBordered
            active={isListOpen}
            onClick={onClickToggleOpenList}
            className={style['component__button']}
        >
            Ещё
        </ButtonBordered>
        <div
            className={classNames(
                style['component__drop-menu'],
                { [style['component__drop-menu_visible']]: isListOpen },
                { [style['component__drop-menu_invisible']]: !isListOpen },
                { [style['component__drop-menu_display-none']]: !isDisplay }
            )}
            onAnimationEnd={onAnimationEndSetIsDisplay(
                style['component__drop-menu_visible']
            )}
        >
            <input
                value={querySearch}
                onChange={onChangeSetQuerySearch}
                className={style['component__search']}
                placeholder='Начните вводить тэг...'
            />
            <TagList
                tagList={tagList}
                selectedTagsId={selectedTagsId}
                onClickTagToggle={onClickTagToggle}
            />
        </div>
    </>
);

export const FilterTagsListSelect = ({ tagList, onClickTagToggle, selectedTagsId }) => {
    const [querySearch, setQuerySearch] = useState();
    const [tagsForList, setTagsForList] = useState([]);
    const [isListOpen, setIsListOpen] = useState(false);
    const [isDisplay, setIsDisplay] = useState(true);

    useEffect(function setFoundTags() {
        if(!querySearch) setTagsForList(tagList);
        else {
            setTagsForList(
                tagList.filter(
                    tag => tag.name.toLowerCase().includes(querySearch.toLowerCase())
                )
            );
        }
    }, [querySearch, tagList]);

    const onChangeSetQuerySearch = e => setQuerySearch(e.target.value);
    const onClickToggleOpenList = () => setIsListOpen(!isListOpen);
    const onAnimationEndSetIsDisplay = classVisible => e => {
        const isVisible = e.target.classList.contains(classVisible);
        if(!isVisible) setIsDisplay(false);
    }

    useEffect(function setIsDisplayByIsListOpen() {
        if(isListOpen) setIsDisplay(true);
    }, [isListOpen]);

    return (
        <FilterTagsListSelectView
            querySearch={querySearch}
            tagList={tagsForList}
            onClickTagToggle={onClickTagToggle}
            onChangeSetQuerySearch={onChangeSetQuerySearch}
            onClickToggleOpenList={onClickToggleOpenList}
            onAnimationEndSetIsDisplay={onAnimationEndSetIsDisplay}
            isDisplay = {isDisplay}
            selectedTagsId={selectedTagsId}
            isListOpen={isListOpen}
        />
    );
}