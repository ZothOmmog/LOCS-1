import React from 'react';
import '../CommonStyles/Button/Button.css';
import s from './UserProfile.module.css';

export const UserProfile = (props) => {
    const imgUrl = 'https://im0-tub-ru.yandex.net/i?id=bc7f9021eae00edbac26dc53c0e013c4&n=13';
    return (
        <div className={s.userProfile}>
            <h2 className={s.head}>Профиль пользователя</h2>
            <div className={s.profile}>
                <div className={s.pictureZone}>
                    <img className={s.picture} src={imgUrl} alt='' />
                    <div className={`button ${s.addImg}`}>
                        Загрузить<br></br>изображение
                    </div>
                </div>

                <div className={s.profileInfo}>
                    <div className={s.nick}><b>Ник:</b> {props.nick}</div>
                    <div className={s.mail}><b>Почта:</b> {props.mail}</div>
                    <div className={s.city}><b>Город:</b> {props.city}</div>
                </div>
            </div>

            <div className={`button ${s.exit}`}>Выход</div>
        </div>
    );
}