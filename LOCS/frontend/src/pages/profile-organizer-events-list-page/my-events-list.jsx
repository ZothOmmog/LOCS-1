import { Button, Pagination, Popconfirm, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
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
                    <Popover
                        key={event.id}
                        placement='left'
                        trigger='click'
                        title='Действия'
                        overlayClassName={styles['popover']}
                        content={
                            <>
                                <Button type='text'>
                                    Редактировать
                                </Button>
                                <Button type='text'>
                                    Просмотр
                                </Button>
                                <Popconfirm
                                    title='Точно удалить?'
                                    okText='Да'
                                    cancelText='Нет'
                                    onConfirm={() => dispatch(myEventsListThunks.fetchRemoveEvent(event.id))}
                                >
                                    <Button type='text' danger>
                                        Удалить
                                    </Button>
                                </Popconfirm>
                            </>
                        }
                    >
                            <EventProfileSearch
                                key={event.id}
                                name={event.name}
                                className={styles['item']}
                                date='тестовая дата'
                                location='Тестовая Улица. Тестовый дом'
                                tags={[
                                    { id: 0, name: 'Мок 1' },
                                    { id: 1, name: 'Мок 2' },
                                    { id: 2, name: 'Мок подлиннее' },
                                    { id: 3, name: 'Просто мок' }
                                ]}
                            />
                    </Popover>
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
