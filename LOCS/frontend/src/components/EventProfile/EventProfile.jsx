import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './EventProfile.module.css';

const EventProfile = (props) => {
	return (
		<div className={s.Event}>
			<div className={s.name}><NavLink to={`/EventProfile/${props.id}`}>{props.name}</NavLink></div>
			<div className={s.type}>{props.type}</div>
			<div className={s.info}>{props.info}</div>
			<div className={s.TicketPrice}>Цена билета: бесплатно</div>
			<div className={s.Organizer}>Организатор: CreateEvent Inc.</div>
		</div>
	);
}

export default EventProfile;