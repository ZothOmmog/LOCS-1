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
                ({ renderProp, key }) => <li key={key} className={style['__drop-list-item']}>{renderProp(style['__drop-list-item-inner'])}</li>
            )}
        </ul>
    </div>
);