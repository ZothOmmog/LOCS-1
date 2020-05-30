import React from 'react';
import Event from './Event/Event.jsx';
import s from "./Lenta.module.css";

const Lenta = (props) => {
	const pages = props.pages.map(p => {
		return +p === +props.currentPage ?
			<div
				className={s.page + " button " + s.currentPage}
				onClick={() => { props.changePage(p) }}
			>
				{p}
			</div> :
			<div
				className={s.page + " button"}
				onClick={() => { props.changePage(p) }}
			>
				{p}
			</div>;
	});

	const events = props.events.map(e => {
		return <Event id={e.id} name={e.name} type={e.type} info={e.info} />;
	});

	return (
		<div className={s.Lenta + ' ' + s.LentaOutherWrapper}>
			<div className={s.head}>Лента Мероприятий</div>
			<div className={s.events}>
				{events}
			</div>
			<div className={s.pages}>
				{pages}
			</div>
		</div>
	);
}

export default Lenta;