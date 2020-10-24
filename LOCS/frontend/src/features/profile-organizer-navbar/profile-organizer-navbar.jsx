import React from 'react';
import style from './style.module.scss';
import classNames from 'classnames';
import { ButtonCustom, LinkCustom, NavLinkCustom } from '~/ui/atoms';
import { useDispatch } from 'react-redux';
import { authActions } from '~/redux/common-slices/auth-slice';
import { ButtonWithDropList } from '~/ui/molecules';
import { useLocation } from 'react-router-dom';


const ProfileOrganizerNavbarView = ({ logoutCallback, eventsPages, currentEventPage }) => (
    <div className={style['profile-organizer-navbar']}>
        <div className={style['__left-content']}>
            <NavLinkCustom to='/profile/organizer/info' className={style['__item']} activeClassName={style['__item_active']}>
                Информация
            </NavLinkCustom>
            <ButtonWithDropList
                componentsForList={eventsPages.map(
                    ([ name, path ]) => ({
                        renderProp: className => (
                            <LinkCustom to={path} className={classNames(style['__list-events-item'], className)}>
                            {name}
                            </LinkCustom>
                        ),
                        key: path
                    })
                )}
                className={style['__drop-list']}
            >
                {className => currentEventPage[1] ? (
                    <LinkCustom to={currentEventPage[1]} className={classNames(style['__item'], style['__item_active'], style['__item_button'], className)}>
                        {currentEventPage[0]} 
                    </LinkCustom>
                ) : (
                    <ButtonCustom className={classNames(style['__item'], style['__item_button'], className)}>
                        {currentEventPage[0]}
                    </ButtonCustom>
                )}
            </ButtonWithDropList>
        </div>
        <ButtonCustom className={style['__exit']} onClick={logoutCallback}>
            Выход
        </ButtonCustom>
    </div>
);

export const ProfileOrganizerNavbar = () => {
    const dispatch = useDispatch();
    const logoutCallback = () => dispatch(authActions.logout());
    const { pathname } = useLocation();

    const eventsPages = [
        ['Список событий', '/profile/organizer/events/list'],
        ['Создать событие', '/profile/organizer/events/create'],
        ['Редактировать событие', '/profile/organizer/events/edit'],
        ['Удалить событие', '/profile/organizer/events/remove']
    ];

    const currentEventPage = (
        eventsPages.find(
            (item, index) => item[1] === pathname ? (eventsPages.splice(index, 1), true) : false
        ) ||
        ['Мои события']
    );
    eventsPages.sort();

    return (
        <ProfileOrganizerNavbarView
            logoutCallback={logoutCallback}
            eventsPages={eventsPages}
            currentEventPage={currentEventPage}
        />
    );
}