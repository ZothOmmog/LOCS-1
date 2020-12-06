import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { EventProfileSearch } from '~/ui/atoms';
import { myEventsListThunks } from './my-events-list-slice';

export const MyEventsList = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(myEventsListThunks.fetchMyEvents());
    }, [dispatch]);

    return (
        <EventProfileSearch
            name='Название события'
            date='21.12.2020 19:00'
            location='Улица Пушкина. Дом Колотушкина'
            tags={[{ name: 'Кино' }, { name: 'Театр' }, { name: 'Гик' }, { name: 'Гик' }]}
        />
    );
};
