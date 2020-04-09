import React from 'react';
import s from "./tag.module.css";

const Tag = (props) => {
    return (
        <div className={s.Tag}>
            #{props.state}
        </div>
    );
}

export default Tag;