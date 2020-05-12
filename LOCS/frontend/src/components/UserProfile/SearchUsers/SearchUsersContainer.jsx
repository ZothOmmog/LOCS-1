import React from 'react';
import { connect } from 'react-redux';
import { SearchUsers } from './SearchUsers';
import { SearchUsersByNickThunk, updateIsSearch, searchClear } from '../../../redux/searchReducer';
import { UserProfileShort } from '../../UserProfileShort/UserProfileShort';
import { changePage, clearSearchUsersPage } from '../../../redux/searchUsersReducer';

class SearchUsersPreContainer extends React.Component {
    UsersForUI = () => {
        if(!this.props.isSearch) return null;
        if(!this.props.users || !this.props.users.length) return null;

        let Users  = [];


        for(let i = 0; i < this.props.users.length; i++) {
            Users.push(
                <UserProfileShort 
                    key={this.props.users[i].user.id_user} 
                    nick={this.props.users[i].user.nickname}
                    userId={this.props.users[i].user.id_user} 
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
        this.props.SearchUsersByNickThunk(this.props.countUsers, e.target.innerText, this.props.currentQueryText);
    }

    // componentWillUnmount() {
    //     this.props.updateIsSearch(false);
    //     this.props.clearSearchUsersPage();
    // }

    onClickBackHandler = () => {
        this.props.updateIsSearch(false);
        this.props.clearSearchUsersPage();
        this.props.searchClear();
    }
    
    render() {
        return (
            <SearchUsers
                isSearch={this.props.isSearch}
                pages={this.props.pages}
                searchResultTitle={this.searchResultTitleForUI()}
                users={this.UsersForUI()}
                searchUsersGo={this.props.SearchUsersByNickThunk}
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
    pages: state.searchUsersPage.pages,
    countUsers: state.searchUsersPage.countUsers,
    currentPage: state.searchUsersPage.currentPage,
    currentQueryText: state.searchPage.currentQueryText
});

export const SearchUsersContainer = connect(mapStateToProps, { SearchUsersByNickThunk, updateIsSearch, changePage, clearSearchUsersPage, searchClear })(SearchUsersPreContainer);