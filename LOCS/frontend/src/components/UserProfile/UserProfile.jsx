import React from 'react';
import '../CommonStyles/Button/Button.css';
import s from './UserProfile.module.scss';

export const UserProfile = (props) => {
    const imgUrl = 'https://im0-tub-ru.yandex.net/i?id=bc7f9021eae00edbac26dc53c0e013c4&n=13';
    return (
        <div className={s.UserProfile}>
            <h1 className={s.UserProfile__Title}>Профиль пользователя</h1>
            <div className={s.UserProfileOutherWrapper}>
                <div className={s.UserProfileInnerWrapper}>
                    <div className={s.UserProfileInnerWrapperPicture}>
                        <img className={s.UserProfileInnerWrapperPicture__Img} src={imgUrl} alt='' />
                        <div className={`button ${s.UserProfileInnerWrapperPicture__Button}`}>
                            Загрузить изображение
                        </div>
                    </div>

                    <div className={s.UserProfileInnerWrapperDescribtion}>
                        <div className={s.UserProfileInnerWrapperDescribtion__Item}><b>Ник:</b> {props.nick}</div>
                        <div className={s.UserProfileInnerWrapperDescribtion__Item}><b>Почта:</b> {props.mail}</div>
                        <div className={s.UserProfileInnerWrapperDescribtion__Item}><b>Город:</b> {props.city}</div>
                    </div>
                </div>
                    <div 
                        className={`button ${s.UserProfileInnerWrapper__ExitButton}`}
                        onClick={props.logoutMeThunk}
                    >
                        Выход
                    </div>
            </div>
        </div>
    );
}