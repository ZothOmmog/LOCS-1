import React from 'react';
import "../CommonStyles/Button/Button.css";
import s from "./Search.module.css";
import Tag from "./Tag/tag.jsx"

const Search = (props) => {
    const tags = props.state.tags.map(tag => {
        return <Tag state={tag} />
    });

    const onQueryTextChange = (e) => {
        const newQueryText = e.target.value;
        props.onQueryTextChange(newQueryText);
    }
    return (
        <div className={s.Search}>
            <div className={s.searchArea}>
                <input
                    type="text"
                    placeholder="Поиск..."
                    value={props.state.queryText}
                    onChange={onQueryTextChange}
                />
                <div className={`button ${s.btn}`}>Найти</div>
            </div>

            <div className={s.tagsArea}>{tags}</div>
        </div>
    );
}

export default Search;