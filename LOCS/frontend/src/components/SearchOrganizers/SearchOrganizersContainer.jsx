// import React from 'react';
// import { connect } from 'react-redux';
// import { SearchOrganizers } from './SearchOrganizers';
// import { updateResultOrgSearch as updateResultSearch, updateIsSearch, searchClear, updatePages, updateTypeSearch } from '../../redux/searchReducer';
// import { changePage, clearSearchUsersPage } from '../../redux/searchUsersReducer';
// import { setPathBack } from '../../redux/indexReducers';
// import { organizerApi } from '../../api/indexApi';
// import { OrganizerProfileShort } from './OrganizerProfileShort/OrganizerProfileShort';
// import s from './SearchOrganizers.module.scss';

// class SearchOrganizersPreContainer extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { events: this.props.resultSearch || [], eventsForUI: this.props.resultSearch ? this.UsersForUI(this.props.resultSearch) : [] };
//     }

//     componentDidMount = () => {
//         this.props.setPathBack('/UserProfile/me/SearchUsers');
//         if(this.props.resultSearch && this.props.resultSearch[0] && this.props.resultSearch[0].searchevent) {
//             this.setState({ events: [], eventsForUI: [] });
//         }
//         if (this.props.typeSearch !=='Organizer') {
//             this.props.searchClear();
//             this.props.clearSearchUsersPage();
//             this.props.updateTypeSearch('Organizer');
//         }
//     }

//     UsersForUI = (events) => {
//         let Users  = [];
        
//         if(this.props.resultSearch && this.props.resultSearch[0] && this.props.resultSearch[0].searchevent) return [];

//         for(let i = 0; i < events.length; i++) {
//             Users.push(
//                 <div className={s.OrgShort}>
//                 <OrganizerProfileShort
//                     key={events[i].searchorg.id} 
//                     userId={events[i].searchorg.id_user}
//                     img={events[i].searchorg.logo}
//                     nick={events[i].searchorg.organization_name}
//                 />
//                 </div>
//             );
//         }
        
//         return Users;
//     }

//     searchResultTitleForUI = () => {
//         if(!this.props.isSearch) return '';
//         if(!this.props.users) return '';
//         if(!this.props.users.length) return 'По запросу ничего не найдено';
//         return `По запросу найдено ${this.props.resultSize} пользователей`;
//     }

//     changeCurrentPage = (e) => {
//         this.props.changePage(e.target.innerText);
//         // this.props.SearchUsersByNickThunk(this.props.countUsers, e.target.innerText, this.props.currentQueryText);
//         organizerApi.searchOrg(this.props.countUsers, e.target.innerText, this.props.queryText).then(events => {
//             this.setState({
//                 events: events,
//                 eventsForUI: this.UsersForUI(events.data)
//             });
            
//             this.props.updatePages(events.count);
//         });
//     }

//     onClickBackHandler = () => {
//         this.props.updateIsSearch(false);
//         this.props.clearSearchUsersPage();
//         this.props.searchClear();
//     }
    
//     render() {
//         return (
//             <SearchOrganizers
//                 isSearch={this.props.isSearch}
//                 pages={this.props.pages}
//                 searchResultTitle={this.searchResultTitleForUI()}
//                 users={this.state.eventsForUI}
//                 searchUsersGo={(pageSize, currentPage, queryText) => {
//                     organizerApi.searchOrg(pageSize, currentPage, this.props.queryText || queryText).then(events => {
//                         this.setState({
//                             events: events.data,
//                             eventsForUI: this.UsersForUI(events.data)
//                         });
//                         this.props.updateResultSearch(events.data);
//                         this.props.updatePages(events.count);
//                     });
//                 }}
//                 countUsers={this.props.countUsers}
//                 currentPage={this.props.currentPage}
//                 changeCurrentPage={this.changeCurrentPage}
//                 onClickBackHandler={this.onClickBackHandler}
//             />
//         );
//     }
// }

// const mapStateToProps = (state) => ({
//     resultSize: state.searchPage.resultSize,
//     isSearch: state.searchPage.isSearch,
//     users: state.searchPage.resultSearch,
//     pages: state.searchPage.pages,
//     countUsers: state.searchUsersPage.countUsers,
//     currentPage: state.searchUsersPage.currentPage,
//     currentQueryText: state.searchPage.currentQueryText,
//     queryText: state.searchPage.queryText,
//     resultSearch: state.searchPage.resultOrgSearch,
//     typeSearch: state.searchPage.typeSearch
// });

// export const SearchOrganizersContainer = connect(mapStateToProps, { 
//     updateResultSearch, updateIsSearch, changePage, 
//     clearSearchUsersPage, searchClear , setPathBack, updatePages, updateTypeSearch})(SearchOrganizersPreContainer);