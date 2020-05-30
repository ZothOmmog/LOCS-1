import React, { useState } from 'react';
import s from './Events.module.scss';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '../../../Button-bem/Button';
import { NavButton } from '../../../NavButton/NavButton';
import { PagesNumbersMenu } from '../../../PagesNumbersMenu/PagesNumbersMenu';

export const Events = (props) => {
    const [events, setEvents] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getEvents = async () => {
            const eventsFromServer = [
                { id: '1', name: 'Dance Walking 2020' },
                { id: '2', name: 'Stand-Up On Tour' }
            ];

            const deleteEventHandler = (eventId) => () => {
                alert(`Тут обращение к api для удаления события c id=${eventId}`);
            }

            setEvents(eventsFromServer.map(event => {
                return (
                    <div className={s.Event}>
                        <div className={s.Event__Name}>
                            <NavLink to={`/EventProfile/${event.id}`}>{event.name}</NavLink>
                        </div>
                        <NavButton
                            style={{
                                type: 'NotBorderRadius',
                                path: `/UserProfile/me/Organizer/EditEvent/${event.id}`,
                                buttonText: 'Редактировать'
                            }}
                        />
                        <Button
                            style={{
                                type: 'NotBorderRadiusRed',
                                onClickHandler: deleteEventHandler(event.id),
                                buttonText: 'Удалить'
                            }}
                        />
                    </div>
                );
            }));
        }

        getEvents();
    }, []);

    return <div className={s.UserList}>
        <div className={s.Events}>
            {events}
        </div>
        <div className={s.UserList__PagesNumbersMenu}>
            {props.pages ?
                <PagesNumbersMenu
                    pages={props.pages}
                    changeCurrentPage={props.changeCurrentPage}
                    currentPage={props.currentPage}
                /> : ''
            }
        </div>
    </div>;
}