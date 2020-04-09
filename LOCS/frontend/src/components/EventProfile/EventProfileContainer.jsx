import React from 'react';
import EventProfile from './EventProfile';
import { setCurrentEvent, removeCurrentEvent } from '../../redux/eventProfileReducer';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class EventProfileToApiContainer extends React.Component {
    componentDidMount() {
        this.setCurrentEvent();
    }

    componentWillUnmount() {
        this.props.removeCurrentEvent();
    }

    setCurrentEvent = () => {
        const eventId = this.props.match.params.eventId;

        fetch(`http://localhost:4000/event/profile?eventId=${eventId}`)
            .then ( responce => responce.json() )
            .then ( response => this.props.setCurrentEvent(response.event) );
    }

    render() {
        return (
            <EventProfile
                id={this.props.id || "Пусто" }
                name={this.props.name || "Пусто"}
                type={this.props.type || "Пусто"}
                info={this.props.info || "Пусто"}
            />
        );
    }
}

const EventProfileWithRouter = withRouter(EventProfileToApiContainer);

const mapStateToProps = (state) => ({
    id: state.EventProfilePage.currentEvent.id,
    name: state.EventProfilePage.currentEvent.name,
    type: state.EventProfilePage.currentEvent.type,
    info: state.EventProfilePage.currentEvent.info
});

export const EventProfileContainer = connect(mapStateToProps, {setCurrentEvent, removeCurrentEvent})(EventProfileWithRouter);