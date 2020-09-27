import React from 'react';
import style from './style.module.scss';

export const ProfileVisitorInfoTemplate = ({ children }) => (
    <div className={style['profile-visitor-info-template']}>
        <div className={style['__main-header']}>
            {children[0]}
        </div>
        <div className={style['__body']}>
            <div className={style['__main']}>
                <div className={style['__header']}>
                    <div className={style['__main-info']}>
                        {children[1]}
                    </div>
                    <div className={style['__toggle-link']}>
                        {children[2]}
                    </div>
                </div>
                <div className={style['__navbar']}>
                    {children[3]}
                </div>
                <div className={style['__info']}>
                    {children[4]}
                </div>
            </div>
            <div className={style['__map-link']}>
                {children[5]}
            </div>
        </div>
    </div>
);