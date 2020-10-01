import React from 'react';
import { useSelector } from 'react-redux';
import { userProfileDefaultImg } from '~/assets';
import { authSelectors } from '~/redux/common-slices/auth-slice';
import style from './style.module.scss';

const ProfileOrganizerMainInfoView = ({ logo, name }) => (
    <div className={style['__profile-organizer-main-info']}>
        <img className={style['__picture']} src={logo || userProfileDefaultImg} alt="Изображение профиля организатора" />
        <div className={style['__name']}>{name}</div>
    </div>
);

export const ProfileOrganizerMainInfo = () => {
    const name = useSelector(authSelectors.organizationNameSelector);
    const logo = useSelector(authSelectors.organizationLogoSelector);

    return (
        <ProfileOrganizerMainInfoView logo={logo} name={name} />
    );
}