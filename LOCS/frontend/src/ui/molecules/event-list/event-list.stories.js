import React from 'react';
import img from './MOCK_IMG.jpg';
import { EventList } from './event-list';
import { EventProfileShort } from '~/ui/atoms';

export default {
  title: 'molecules__EventList',
  component: EventList,
};

export const Regular = () => (
    <EventList>
        <EventProfileShort
            img={img}
            name='Аниме Пати'
            date='29.09.2020'
            location='Улица Пушкина, Дом Колотушкина'
        />
        <EventProfileShort
            img={img}
            name='Аниме Пати'
            date='29.09.2020'
            location='Улица Пушкина, Дом Колотушкина'
        />
        <EventProfileShort
            img={img}
            name='Аниме Пати'
            date='29.09.2020'
            location='Улица Пушкина, Дом Колотушкина'
        />
        <EventProfileShort
            img={img}
            name='Аниме Пати'
            date='29.09.2020'
            location='Улица Пушкина, Дом Колотушкина'
        />
        <EventProfileShort
            img={img}
            name='Аниме Пати'
            date='29.09.2020'
            location='Улица Пушкина, Дом Колотушкина'
        />
        <EventProfileShort
            img={img}
            name='Аниме Пати'
            date='29.09.2020'
            location='Улица Пушкина, Дом Колотушкина'
        />
        <EventProfileShort
            img={img}
            name='Аниме Пати'
            date='29.09.2020'
            location='Улица Пушкина, Дом Колотушкина'
        />
        <EventProfileShort
            img={img}
            name='Аниме Пати'
            date='29.09.2020'
            location='Улица Пушкина, Дом Колотушкина'
        />
        <EventProfileShort
            img={img}
            name='Аниме Пати'
            date='29.09.2020'
            location='Улица Пушкина, Дом Колотушкина'
        />
        <EventProfileShort
            img={img}
            name='Аниме Пати'
            date='29.09.2020'
            location='Улица Пушкина, Дом Колотушкина'
        />
        <EventProfileShort
            img={img}
            name='Аниме Пати'
            date='29.09.2020'
            location='Улица Пушкина, Дом Колотушкина'
        />
        <EventProfileShort
            img={img}
            name='Аниме Пати'
            date='29.09.2020'
            location='Улица Пушкина, Дом Колотушкина'
        />
    </EventList>
);

// export const Active = () => (
//         <EventList>
//             NavLinkColored
//         </EventList>
// );