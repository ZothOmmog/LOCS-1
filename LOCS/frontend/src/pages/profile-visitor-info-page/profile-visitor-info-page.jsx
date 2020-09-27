import React from 'react';
import { HeaderDefault } from '~/features/header-default';
import { ProfileVisitorInfoTemplate } from '~/templates/profile-visitor-info-template';
import { NavLinkMap } from '~/ui';

export const ProfileVisitorInfoPage = () => {
    return (
        <ProfileVisitorInfoTemplate>
            <HeaderDefault />
            <div>Главная информация</div>
            <div>Переключатель типа профиля</div>
            <div>Навбар</div>
            <div>Информация о посетителе</div>
            <NavLinkMap to='/map' />
        </ProfileVisitorInfoTemplate>
    );
}