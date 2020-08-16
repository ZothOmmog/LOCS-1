import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.scss';

export const EventProfileShort = ({ img, name, date, location }) => (
    <div className={style['event-profile-short']}>
        <div className={style['event-profile-short__img-wrapper']}>
            <img className={style['event-profile-short__img']} src={img} alt='Изображение события'/>
            <div className={style['event-profile-short__img-overlay']}></div>
        </div>
        <div className={style['event-profile-short__name']} title={name} >
            {name}
        </div>
        <div className={style['event-profile-short__description']}>
            <span className={style['event-profile-short__date']}>
                {date}
            </span>
            <span className={style['event-profile-short__location']}>
                {location}
            </span>
        </div>
    </div>
);

EventProfileShort.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
};
