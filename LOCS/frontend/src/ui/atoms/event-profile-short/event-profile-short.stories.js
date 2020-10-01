import React from 'react';
import img from './MOCK_IMG.jpg';
import { EventProfileShort } from './event-profile-short';
import { BrowserRouter as Router } from 'react-router-dom';
import { LinkCustom } from '../link-custom';

export default {
    title: 'atoms__EventProfileShort',
    component: EventProfileShort,
};

export const Redular = () => (
    <EventProfileShort
        img={img}
        name='Аниме Пати'
        date='29.09.2020'
        location='Улица Пушкина, Дом Колотушкина'
    />
);

export const WithLink = () => (
    <Router>
        <LinkCustom to='#'>
            <EventProfileShort
                img={img}
                name='Аниме Пати'
                date='29.09.2020'
                location='Улица Пушкина, Дом Колотушкина'
            />
        </LinkCustom>
    </Router>
);
