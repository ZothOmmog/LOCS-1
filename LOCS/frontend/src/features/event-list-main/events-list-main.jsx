import React from 'react';
import { EventList, EventProfileShort, NavLinkCustom } from '~/ui';
import { useSelector, useDispatch } from 'react-redux';
import { eventsListMainSelectors, eventsListMainThunks } from './events-list-main-slice';
import { Loader } from '../loader';
import { useEffect } from 'react';
import { eventProfileMockImg } from '~/assets';


const EventListMainView = ({ eventsData }) => (
    <EventList>
        {eventsData.map(event => (
            <NavLinkCustom to={`/events/${event.id}`}>
                <EventProfileShort
                    date={'Когда-то'}
                    img={event.img ? event.img : eventProfileMockImg}
                    location={'Где-то'}
                    name={event.name}
                />
            </NavLinkCustom>
        ))}
    </EventList>
);

export const EventListMain = () => {
    const dispatch = useDispatch();
    const events = useSelector(eventsListMainSelectors.events);
    const isLoading = useSelector(eventsListMainSelectors.isLoading);

    useEffect(() => {
        dispatch(eventsListMainThunks.fetchEvents());
    }, [dispatch]);

    return (
        <Loader isLoading={isLoading} >
            <EventListMainView eventsData={events} />
        </Loader>
    );
}