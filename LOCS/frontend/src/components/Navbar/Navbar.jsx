import React from 'react';
import "../CommonStyles/Button/Button.css";
import '../CommonStyles/Link/Link.css';
import s from "./Navbar.module.css";
import { NavLink } from 'react-router-dom';

export function Navbar() {
	return (
		<div className={s.Navbar}>
			<div className={s.events}>
				<NavLink to="/Lenta" className="button">
					Лента Мероприятий
				</NavLink>

				<NavLink to="/AddEvent" className="button">
					Новое Мероприятие
				</NavLink>
			</div>
		</div>
	);
}
