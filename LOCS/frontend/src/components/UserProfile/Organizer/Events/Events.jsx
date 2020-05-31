import React, { useState } from 'react';
import s from './Events.module.scss';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '../../../Button-bem/Button';
import { NavButton } from '../../../NavButton/NavButton';
import { PagesNumbersMenu } from '../../../PagesNumbersMenu/PagesNumbersMenu';
import { organizerApi } from '../../../../api/indexApi';


export const Events = (props) => {
    const [events, setEvents] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const deleteEventHandler = (eventId) => () => {
        const deleteEvent = async () => {
            const isDelete = await organizerApi.deleteEvent(eventId);
            if(isDelete) {
                if(+currentPage !== 1) setCurrentPage(1);
                else getEvents();
            }
        }

        deleteEvent();
    }

    const getEvents = async () => {
        const eventsFromServer = await organizerApi.getMyEvents(4, currentPage);
        
        setPages(() => {
            let newPages = [];
            for (let i = 1; i <= Math.ceil(eventsFromServer.count / 4); i++) {
				newPages = [...newPages, i];
            }
            return newPages;
        });

        setEvents(eventsFromServer.data.map(event => {
            return (
                <div className={s.Event}>
                    <div className={s.Event__Name}>
                        <NavLink to={`/EventProfile/${event.eventorglistlimit.id}`}>{event.eventorglistlimit.name}</NavLink>
                    </div>
                    <NavButton
                        style={{
                            type: 'NotBorderRadius',
                            path: `/UserProfile/me/Organizer/EditEvent/${event.eventorglistlimit.id}`,
                            buttonText: 'Редактировать'
                        }}
                    />
                    <Button
                        style={{
                            type: 'NotBorderRadiusRed',
                            onClickHandler: deleteEventHandler(event.eventorglistlimit.id),
                            buttonText: 'Удалить'
                        }}
                    />
                </div>
            );
        }));

    }

    useEffect(function initialSetEventsFromServer() {
        getEvents();
        setIsLoading(false);
    }, []);

    useEffect(function setNewPageEvents() {
        getEvents();
    }, [currentPage]);

    const changeCurrentPage = (e) => {
        setCurrentPage(e.target.innerHTML);
    }

    return isLoading ? 'Загрузка...' : (
        <div className={s.UserList}>
            <div className={s.Events}>
                {events}
            </div>
            <div className={s.UserList__PagesNumbersMenu}>
                {pages.length > 1 ? (
                    <PagesNumbersMenu
                    pages={pages}
                    changeCurrentPage={changeCurrentPage}
                    currentPage={currentPage}
                    />
                ) : null}
            </div>
        </div>
    );
}