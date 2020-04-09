import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Event.module.css';

const Event = (props) => {
	return (
		<div className={s.Event}>
			<div className={s.name}><NavLink to={`/EventProfile/${props.id}`}>{props.name}</NavLink></div>
			<div className={s.type}>{props.type}</div>
			<div className={s.info}>{props.info}</div>
		</div>
	);
}

export default Event;