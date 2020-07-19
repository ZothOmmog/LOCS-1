import React from 'react';
import s from './SearchPage.module.scss';
import { Navigation } from './Navigation/Navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import { searchAPI } from '../../api/api';
import { connect } from 'react-redux';
import { ResultSearch } from './ResultSearch';
import Event from '../Lenta/Event/Event';

export const SearchPage = (props) => {
    const {
        typeSearch, 
        events, organizers, visitors,
        visitorsCount, eventsCount, organizersCount
    } = props;

    //TODO текущую страницу надо вынести в reducer
    //TODO логику загрузки надо вынести в отдельный элемент
    const [currentPage, setCurrentPage] = useState(1);

    const [isLoading, setIsLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(null);

    const [componentWrapper, setComponentWrapper] = useState(null); //TODO по возможности убрать все useState

    useEffect(() => {
        setIsLoading(true);

        switch(typeSearch) {
            case 'All':
                break;
            case 'Events':
                (async function () {
                    setComponentWrapper([Event]);
                })();
                break;
            case 'Organizers':
                break;
            case 'Visitors':
                break;
            default:
                setLoadingError('Неверно указан тип поиска');
                break;
        }

        setIsLoading(false);
    }, [typeSearch]);

    return isLoading ? 'Загрузка...' : loadingError ? loadingError : (
        <div className={s.SearchPage}>
            <div className={s.SearchPage__NavigationOutherWrapper}>
                <Navigation 
                    typeSearch={typeSearch}
                    visitorsCount={visitorsCount}
                    eventsCount={eventsCount}
                    organizersCount={organizersCount}
                />
            </div>
            <div className={s.SearchPage__ResultSearchOutherWrapper}>
                {typeSearch !== 'All' ? (
                    <ResultSearch //TODO по возможность переписать через композицию
                        result={events || organizers || visitors} 
                        СomponentWrapper={componentWrapper && componentWrapper[0]}
                    />
                ) : (
                    <>
                        <ResultSearch 
                            result={events} 
                            СomponentWrapper={Event}
                            header='События'
                        />
                        <ResultSearch 
                            result={organizers} 
                            СomponentWrapper={Event}
                            header='Организаторы'
                        />
                        <ResultSearch 
                            result={visitors} 
                            СomponentWrapper={Event}
                            header='Посетители'
                        />
                    </>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    events: state.search.events,
    organizers: state.search.organizers,
    visitors: state.search.visitors,
    
    visitorsCount: +state.search.visitorsCount,
    eventsCount: +state.search.eventsCount,
    organizersCount: +state.search.organizersCount,
});
export const SearchPageWithQuery = connect(mapStateToProps, null)(SearchPage);