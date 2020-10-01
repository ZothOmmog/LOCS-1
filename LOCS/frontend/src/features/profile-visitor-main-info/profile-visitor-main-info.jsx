import React from 'react';
import { useSelector } from 'react-redux';
import { userProfileDefaultImg } from '~/assets';
import { authSelectors } from '~/redux/common-slices/auth-slice';
import style from './style.module.scss';

const ProfileVisitorMainInfoView = ({ urlPicture, nick }) => (
    <div className={style['__profile-visitor-main-info-view']}>
        <img className={style['__picture']} src={urlPicture || userProfileDefaultImg} alt="Изображение профиля" />
        <div className={style['__nick']}>{nick}</div>
    </div>
);

export const ProfileVisitorMainInfo = () => {
    const nick = useSelector(authSelectors.visitorNickSelector);
    const urlPicture = useSelector(authSelectors.visitorUrlPictureSelector);

    return (
        <ProfileVisitorMainInfoView urlPicture={urlPicture} nick={nick} />
    );
}