import React from 'react';
import style from './style.module.scss';
import classNames from 'classnames';
import { ButtonCustom, NavLinkCustom } from '~/ui/atoms';
import { useDispatch } from 'react-redux';
import { authActions } from '~/redux/common-slices/auth-slice';
import { ButtonWithDropList } from '~/ui/molecules';
import { useLocation } from 'react-router-dom';


const ProfileOrganizerNavbarView = ({ logoutCallback, eventsPages, currentEventPage }) => (
    <div className={style['profile-organizer-navbar']}>
        <NavLinkCustom to='/profile/organizer/info' className={style['__item']} activeClassName={style['__item_active']}>
            Информация
        </NavLinkCustom>
        <ButtonWithDropList
            componentsForList={eventsPages.map(
                ([ name, path ]) => (
                <NavLinkCustom to={path} className={style['__list-events-item']} activeClassName={style['__list-events-item_active']}>
                   {name} 
                </NavLinkCustom>
            ))}
            className={style['__drop-list']}
        >
            {className => (
                <ButtonCustom className={classNames(style['__item'], className)}>
                    {currentEventPage}
                </ButtonCustom>
            )}
        </ButtonWithDropList>
        <ButtonCustom className={style['__exit']} onClick={logoutCallback}>
            Выход
        </ButtonCustom>
    </div>
);

export const ProfileOrganizerNavbar = () => {
    const dispatch = useDispatch();
    const logoutCallback = () => dispatch(authActions.logout());
    const { pathname } = useLocation();

    const eventPageType = pathname.split('/')[4];

    const eventsPages = [
        ['Список событий', '/profile/organizer/events/list'],
        ['Создать событие', '/profile/organizer/events/create'],
        ['Редактировать событие', '/profile/organizer/events/edit'],
        ['Удалить событие', '/profile/organizer/events/remove']
    ];

    const currentEventPage = (
        eventsPages.find(
            (item, index) => item[1] === pathname ? (console.log(eventPageType), eventsPages.splice(index, 1), true) : false
        ) ||
        ['Мои события']
    )[0];

    return (
        <ProfileOrganizerNavbarView
            logoutCallback={logoutCallback}
            eventsPages={eventsPages}
            currentEventPage={currentEventPage}
        />
    );
}