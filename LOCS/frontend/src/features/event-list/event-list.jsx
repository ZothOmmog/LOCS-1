import React from 'React';
import { connect } from 'react-redux';
import { EventList } from '~/ui';

const EventListView = ({ eventsData }) => (
    <EventList>
        
    </EventList>
);

export const EventList = () => {
    return (
        <EventListView />
    );
}