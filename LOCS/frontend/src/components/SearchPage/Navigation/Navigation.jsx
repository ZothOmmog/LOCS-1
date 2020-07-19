import React from 'react';
import PropTypes from 'prop-types';
import s from './Navigation.module.scss';
import { NavButton } from '../../Button-bem/NavButton/NavButton';

//TODO добавить кол-во результатов поиска (должно быть не сложно, вроде уже всё необходимое в BLL есть)
export const Navigation = ({ typeSearch, visitorsCount, eventsCount, organizersCount }) => {
    return (
        <div className={s.Navigation}>
            <NavButton
                style={{ value: 'SearchNavigation' + (typeSearch === 'All' ? 'Active' : '') }}
                className={s.SearchPageNavigation__Item}
                buttonText={`Все результаты: ${visitorsCount + eventsCount + organizersCount}`}
                path='/Search'
            />
            <NavButton
                style={{ value: 'SearchNavigation' + (typeSearch === 'Events' ? 'Active' : '') }}
                className={s.SearchPageNavigation__Item}
                buttonText={`События: ${eventsCount}`}
                path='/Search/Events'
            />
            <NavButton
                style={{ value: 'SearchNavigation' + (typeSearch === 'Organizers' ? 'Active' : '') }}
                className={s.SearchPageNavigation__Item}
                buttonText={`Организаторы: ${organizersCount}`}
                path='/Search/Organizers'
            />
            <NavButton
                style={{ value: 'SearchNavigation' + (typeSearch === 'Visitors' ? 'Active' : '') }}
                className={s.SearchPageNavigation__Item}
                buttonText={`Посетители: ${visitorsCount}`}
                path='/Search/Visitors'
            />
        </div>
    );
}

Navigation.propTypes = {
    typeSearch: PropTypes.oneOf(['All', 'Events', 'Organizers', 'Visitors']),
    countEvents: PropTypes.number,
    countOrg: PropTypes.number,
    countVisitors: PropTypes.number
};