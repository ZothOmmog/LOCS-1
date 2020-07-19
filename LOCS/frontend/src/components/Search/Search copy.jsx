import React from 'react';
import s from "./Search.module.css";
// import Tag from "./Tag/tag.jsx"

const Search = (props) => {
    return (
        <div className={s.Search}>
            <div className={s.SearchArea}>
                <input
                    className={s.SearchArea__Input}
                    type="text"
                    placeholder="Поиск..."
                    value={props.state.queryText}
                    onChange={props.updateQueryText}
                />
            </div>
        </div>
    );
}

export default Search;