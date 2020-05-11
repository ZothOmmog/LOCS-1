import React from 'react';
import { connect } from 'react-redux';
import { SearchUsers } from './SearchUsers';
import { SearchUsersByNickThunk, updateIsSearch } from '../../../redux/searchReducer';
import { UserProfileShort } from '../../UserProfileShort/UserProfileShort';
import { PagesNumbersMenu } from '../../PagesNumbersMenu/PagesNumbersMenu';
import { changePage, clearSearchUsersPage } from '../../../redux/searchUsersReducer';

class SearchUsersPreContainer extends React.Component {
    UsersForUI = () => {
        if(!this.props.isSearch) return null;

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

    changeCurrentPage = (e) => {
        this.props.changePage(e.target.innerText);
        this.props.SearchUsersByNickThunk(this.props.countUsers, e.target.innerText, this.props.currentQueryText);
    }

    componentWillUnmount() {
        this.props.updateIsSearch(false);
        this.props.clearSearchUsersPage();
    }
    
    render() {
        return (
            <div>
            <SearchUsers 
                isSearch={this.props.isSearch}
                pages={this.props.pages}
                users={this.UsersForUI()}
                searchUsersGo={ this.props.SearchUsersByNickThunk }
                countUsers={this.props.countUsers}
                currentPage={this.props.currentPage}
            />
            <PagesNumbersMenu pages={this.props.pages} currentPage={this.props.currentPage} changeCurrentPage={this.changeCurrentPage} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isSearch: state.searchPage.isSearch,
    users: state.searchPage.resultSearch,
    pages: state.searchUsersPage.pages,
    countUsers: state.searchUsersPage.countUsers,
    currentPage: state.searchUsersPage.currentPage,
    currentQueryText: state.searchPage.currentQueryText
});

export const SearchUsersContainer = connect(mapStateToProps, { SearchUsersByNickThunk, updateIsSearch, changePage, clearSearchUsersPage })(SearchUsersPreContainer);