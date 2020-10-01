import React from 'react';
import style from './style.module.scss';
import classNames from 'classnames';

export const ButtonWithDropList = ({ children, componentsForList, className }) => (
    <div className={classNames(
        style['button-with-drop-list'],
        { [className]: className }
    )}>
        {children(style['__button'])}
        <ul className={style['__drop-list']}>
            {componentsForList.map(
                (item, index) => (
                    children ? <li className={style['__drop-list-item']}>{item}</li> : index > 0 ? <li className={style['__drop-list-item']}>{item}</li> : null
                )
            )}
        </ul>
    </div>
);