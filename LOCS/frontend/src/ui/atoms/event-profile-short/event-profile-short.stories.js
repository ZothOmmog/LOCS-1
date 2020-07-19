import React from 'react';
import img from './MOCK_IMG.jpg';
import { EventProfileShort } from './event-profile-short';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavLinkCustom } from '../nav-link-custom';

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
        <NavLinkCustom to='#'>
            <EventProfileShort
                img={img}
                name='Аниме Пати'
                date='29.09.2020'
                location='Улица Пушкина, Дом Колотушкина'
            />
        </NavLinkCustom>
    </Router>
);
