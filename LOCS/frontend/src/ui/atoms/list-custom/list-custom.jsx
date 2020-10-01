import React from 'react';
import style from './style.module.scss';
import classNames from 'classnames';

export const ListCustom = ({ headers, disriptions, listClassName, itemClassName }) => (
    <ul className={classNames(
        style['__list-custom'],
        { [listClassName]: listClassName }
    )}>
        {headers.map((header, index) => (
            <li className={classNames(
                style['__record'],
                { [itemClassName]: itemClassName }
            )}>
                <div className={style['__label']}>
                    {header}
                </div>
                <div className={style['__info']}>
                    {disriptions[index]}
                </div>
            </li>
        ))}
    </ul>
);