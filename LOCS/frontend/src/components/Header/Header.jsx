import React from 'react';
import s from "./Header.module.css";
import "../CommonStyles/Link/Link.css";
import { NavLink } from 'react-router-dom';

export function Header(props) {
	const auth = props.isAuth ? (
		<div className={s.auth}>
			<NavLink to="/userProfile/me" className={s.button}>
				Пользователь: {props.nick}
			</NavLink>
		</div>
	) :
		(
			<div className={s.buttons}>
				<NavLink to="/Auth" className={s.button}>
					Вход
				</NavLink>
				<div className={s.partition}></div>
				<NavLink to="/Registration" className={s.button}>
					Регистрация
				</NavLink>
			</div>
		);


	return (
		<div className={s.Header}>
			{auth}
		</div>
	);
}