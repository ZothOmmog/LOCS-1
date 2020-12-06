import React from 'react';
import style from './event-profile-search.module.scss';
import { eventProfileMockImg } from '~/assets/images';

export const EventProfileSearch = ({ name, date, location, tags }) => (
    <div className={style['_']}>
        <div className={style['img-wrapper']}>
            <img className={style['img']} src={eventProfileMockImg} alt='Изображение события' />
            <div className={style['img-overlay']}></div>
        </div>
        <div className={style['main']}>
            <div className={style['main-header']}>{name}</div>
            <div className={style['main-section']}>
                <div className={style['main-section-label']}>Дата</div>
                <div className={style['main-section-value']}>{date}</div>
            </div>
            <div className={style['main-section']}>
                <div className={style['main-section-label']}>Место проведения</div>
                <div className={style['main-section-value']}>{location}</div>
            </div>
        </div>
        <div className={style['tags']}>
            {tags.map(tag => (
                <div className={style['tags-item']}>{tag.name}</div>
            ))}
        </div>
    </div>
);
