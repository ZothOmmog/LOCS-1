import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import s from './EventProfile.module.css';
import { eventAPI } from '../../api/api';

export const EventProfile = ({ eventId }) => {
	const [event, setEvent] = useState({
        id: eventId,
        name: '',
        tags: [{ id: '', title: '' }],
        info: '',
		ticketPrice: '',
        orgName: '',
        orgId: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(function ininialGetEventFromServer() {
        
        const getEvent = async () => {
            const eventFromServer = await eventAPI.getEvent(event.id);

            setEvent({
                id: event.id,
                name: eventFromServer.event.name,
                tags: eventFromServer.tags.eventtags ? eventFromServer.tags.eventtags.title : [{ id: '', title: 'Нет данных' }],
                info: eventFromServer.event.info,
				ticketPrice: eventFromServer.event.ticket_price,
                orgName: eventFromServer.event.organization_name,
                orgId: eventFromServer.event.id_organizer
            });
        }
        
        getEvent();
        
        setIsLoading(false);
    }, [event.id]);

	return isLoading ? 'Загрузка...' : (
		<div className={s.Event}>
			<div className={s.name}>{event.name}</div>
			<div className={s.type}>{event.tags[0].title}</div>
			<div className={s.info}>{event.info}</div>
			<div className={s.TicketPrice}>Цена билета: {event.ticketPrice} руб.</div>
			<div className={s.Organizer}>Организатор: <NavLink to={`/userProfile/${event.orgId}/Organizer`}>{event.orgName}</NavLink></div>
		</div>
	);
}
