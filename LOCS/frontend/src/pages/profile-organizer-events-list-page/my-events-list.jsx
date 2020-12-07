import { Pagination } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EventProfileSearch } from '~/ui/atoms';
import { myEventsListSelectors, myEventsListThunks } from './my-events-list-slice';
import styles from './my-events-list.module.scss';

export const MyEventsList = () => {
    const events = useSelector(myEventsListSelectors.selectAll);
    const { pageSize, pageNumber, total } = useSelector(myEventsListSelectors.pageInfo);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(myEventsListThunks.fetchMyEvents());
    }, [dispatch]);

    return (
        <>
            <div>
                {events ? events.map(event => (
                    <EventProfileSearch
                        name={event.name}
                        className={styles['item']}
                        date='21.12.2020 19:00'
                        location='Тестовая Улица. Тестовый дом'
                        tags={[{ name: 'Мок 1' }, { name: 'Мок 2' }, { name: 'Мок подлиннее' }, { name: 'Просто мок' }]}
                    />
                )) : 'Нет данных'}
            </div>
            <div className={styles['pagination-wrapper']}>
                <Pagination
                    simple
                    current={pageNumber}
                    defaultPageSize={pageSize}
                    total={total}
                    onChange={(pageNumber) => dispatch(myEventsListThunks.fetchMyEvents(pageNumber))}
                />
            </div>
        </>
    );
};
