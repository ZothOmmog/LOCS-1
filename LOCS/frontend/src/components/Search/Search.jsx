import React from 'react';
import "../CommonStyles/Button/Button.css";
import s from "./Search.module.css";
// import Tag from "./Tag/tag.jsx"

const Search = (props) => {
    // const tags = props.state.tags.map(tag => {
    //     return <Tag state={tag} />
    // });
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
                <div 
                    className={`button ${s.SearchArea__Button}`}
                    onClick={props.searchGo}
                >
                    Найти
                </div>
            </div>

            {/* <div className={s.TagsArea}>{tags}</div> */}
        </div>
    );
}

export default Search;