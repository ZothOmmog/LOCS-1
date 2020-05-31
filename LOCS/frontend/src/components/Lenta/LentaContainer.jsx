import React from "react";
import { connect } from "react-redux"
import Lenta from "./Lenta";
import { setEvents, changePage } from "../../redux/lentaReducer";
import { eventAPI } from "../../api/api";

class LentaToApiContainer extends React.Component {
	componentDidMount() {
		this.setEvents();
	}

	setEvents = () => {
		const currentPage = this.props.state.currentPage;
		const countEvents = this.props.state.countEvents;
		
		eventAPI.getEvents(currentPage, countEvents).then(events => {
			this.props.setEvents(events.map(event => ({
				id: event.eventshortlist.id,
				name: event.eventshortlist.name,
				type: event.tags[0] || 'Нет данных',
				info: event.eventshortlist.info
			})), events.length);
		});
	}

	changePage = (page) => {
		const newPage = page;
		const currentPage = newPage;
		const countEvents = this.props.state.countEvents;

		// fetch(`http://localhost:4000/event?page=${currentPage}&count=${countEvents}`)
		// 	.then(response => response.json())
		// 	.then(response => this.props.changePage(newPage, response.events))
		// 	.catch(error => alert(error)
		// 	);
	}

	render() {
		return (
			<Lenta
				pages={this.props.state.pages}
				events={this.props.state.events}
				currentPage={this.props.state.currentPage}
				changePage={this.changePage}
			/>
		);
	}
}

const mapStateToProps = (state) => ({ state: state.lentaPage });

export const LentaContainer = connect(mapStateToProps, { setEvents, changePage })(LentaToApiContainer);