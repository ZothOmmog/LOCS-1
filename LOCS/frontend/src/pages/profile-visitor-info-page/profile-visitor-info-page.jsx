import React from 'react';
import { ProfileVisitorInfoTemplate } from '~/templates/profile-visitor-info-template';

export const ProfileVisitorInfoPage = () => {
    return (
        <ProfileVisitorInfoTemplate>
            <div>Главная информация</div>
            <div>Переключатель типа профиля</div>
            <div>Навбар</div>
            <div>Информация о посетителе</div>
        </ProfileVisitorInfoTemplate>
    );
}