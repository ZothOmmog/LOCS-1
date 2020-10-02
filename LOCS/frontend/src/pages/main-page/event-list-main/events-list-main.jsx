import React from 'react';
import { EventList, EventProfileShort, LinkCustom } from '~/ui';
import { useSelector, useDispatch } from 'react-redux';
import { eventsListMainSelectors, eventsListMainThunks } from './events-list-main-slice';
import { Loader } from '~/features/loader';
import { useEffect } from 'react';
import { eventProfileMockImg } from '~/assets';
import { useFilterEvents } from './use-filter-events';


const EventListMainView = ({ eventsData }) => (
    <EventList>
        {eventsData.map(event => (
            <LinkCustom to={`/events/${event.id}`} key={event.id}>
                <EventProfileShort
                    date={'Когда-то'}
                    img={event.img ? event.img : eventProfileMockImg}
                    location={'Где-то'}
                    name={event.name}
                />
            </LinkCustom>
        ))}
    </EventList>
);

export const EventListMain = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(eventsListMainSelectors.isLoading);
    const events = useSelector(eventsListMainSelectors.events);
    const filteredEvents = useFilterEvents(events);    

    useEffect(() => {
        dispatch(eventsListMainThunks.fetchEvents());
    }, [dispatch]);

    return (
        <Loader isLoading={isLoading} >
            <EventListMainView eventsData={filteredEvents} />
        </Loader>
    );
}