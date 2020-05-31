import React from 'react';
import { connect } from 'react-redux';
import { SearchEvents } from './SearchEvents';
import { updateResultEventsSearch as updateResultSearch, updateIsSearch, searchClear, updatePages } from '../../redux/searchReducer';
import { changePage, clearSearchUsersPage } from '../../redux/searchUsersReducer';
import { setPathBack } from '../../redux/indexReducers';
import { eventAPI } from '../../api/api';
import Event from '../Lenta/Event/Event';

class SearchEventsPreContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { events: this.props.resultSearch || [], eventsForUI: this.props.resultSearch ? this.UsersForUI(this.props.resultSearch) : [] };
    }

    componentDidMount = () => {
        this.props.setPathBack('/UserProfile/me/SearchUsers');
    }

    UsersForUI = (events) => {
        let Users  = [];

        for(let i = 0; i < events.length; i++) {
            Users.push(
                <Event 
                    key={events[i].searchevent.id} 
                    id={events[i].searchevent.id}
                    name={events[i].searchevent.name}
                    type={events[i].tags[0] || 'Нет данных'}
                    info={events[i].searchevent.info}
                />
            );
        }
        
        return Users;
    }

    searchResultTitleForUI = () => {
        if(!this.props.isSearch) return '';
        if(!this.props.users) return '';
        if(!this.props.users.length) return 'По запросу ничего не найдено';
        return `По запросу найдено ${this.props.resultSize} пользователей`;
    }

    changeCurrentPage = (e) => {
        this.props.changePage(e.target.innerText);
        eventAPI.searchEvents(this.props.countUsers, e.target.innerText, this.props.queryText).then(events => {
            this.setState({
                events: events.Events,
                eventsForUI: this.UsersForUI(events.Events)
            });
            
            this.props.updatePages(events.count);
        });
    }

    onClickBackHandler = () => {
        this.props.updateIsSearch(false);
        this.props.clearSearchUsersPage();
        this.props.searchClear();
    }
    
    render() {
        return (
            <SearchEvents
                isSearch={this.props.isSearch}
                pages={this.props.pages}
                searchResultTitle={this.searchResultTitleForUI()}
                users={this.state.eventsForUI}
                searchUsersGo={(pageSize, currentPage, queryText) => {
                    eventAPI.searchEvents(pageSize, currentPage, this.props.queryText || queryText).then(events => {
                        this.setState({
                            events: events.Events,
                            eventsForUI: this.UsersForUI(events.Events)
                        });
                        this.props.updateResultSearch(events.Events);
                        this.props.updatePages(events.count);
                    });
                }}
                countUsers={this.props.countUsers}
                currentPage={this.props.currentPage}
                changeCurrentPage={this.changeCurrentPage}
                onClickBackHandler={this.onClickBackHandler}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    resultSize: state.searchPage.resultSize,
    isSearch: state.searchPage.isSearch,
    users: state.searchPage.resultSearch,
    pages: state.searchPage.pages,
    countUsers: 3,
    currentPage: state.searchUsersPage.currentPage,
    currentQueryText: state.searchPage.currentQueryText,
    queryText: state.searchPage.queryText,
    resultSearch: state.searchPage.resultEventsSearch
});

export const SearchEventsContainer = connect(mapStateToProps, { 
    updateResultSearch, updateIsSearch, changePage, 
    clearSearchUsersPage, searchClear , setPathBack, updatePages})(SearchEventsPreContainer);