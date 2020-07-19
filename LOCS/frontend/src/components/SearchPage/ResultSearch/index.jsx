import React from 'react';
import s from './index.module.scss';
import Event from '../../Lenta/Event/Event.jsx';

export const ResultSearch = ({ result, СomponentWrapper, header }) => {
    const resultForUI = !result ? 'По вашему запросу ничего не найдено'
        : result.map((item) => {
          const { id, ...outher } = item;
          return <СomponentWrapper key={id} {...outher} />;
    });

    return (
        <div className={s.ResultSearch}>
            {header ? (
                <h2 className={s.ResultSearch__Title}>{header}</h2>
            ): null}
            {resultForUI}
        </div>
    )
}