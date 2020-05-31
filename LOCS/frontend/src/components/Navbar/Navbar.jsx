import React from 'react';
import "../CommonStyles/Button/Button.css";
import '../CommonStyles/Link/Link.css';
import s from "./Navbar.module.css";
import { NavLink } from 'react-router-dom';

export function Navbar() {
	return (
		<div className={s.Navbar + ' ' + s.NavbarOutherWrapper}>
			<NavLink to="/Lenta" className={s.Navbar__item + ' button'}>
				Лента Мероприятий
			</NavLink>

			<NavLink to="/SearchEvents" className={s.Navbar__item + ' button'}>
				Поиск мероприятий
			</NavLink>

			<NavLink to="/SearchOrganizers" className={s.Navbar__item + ' button'}>
				Поиск организаторов
			</NavLink>
		</div>
	);
}
