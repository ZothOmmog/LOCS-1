import React from 'react';
import { connect } from 'react-redux';
import Search from './Search';
import { updateQueryText, searchClear } from '../../redux/searchReducer';

class SearchToStateContainer extends React.Component {
    updateQueryText = (e) => {
        const newQueryText = e.target.value;
        this.props.updateQueryText(newQueryText);
    }

    searchGo = () => {
        const pageSize = this.props.pageSize;
        const currentPage = this.props.currentPage;
        const queryText = this.props.state.queryText;

        this.props.searchGo(pageSize, currentPage, queryText);
    }

    render() {
        return (
            <Search
                state={this.props.state}
                updateQueryText={this.updateQueryText}
                searchGo={this.searchGo}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state.searchPage
   }
};

export const SearchContainer = connect(mapStateToProps, { updateQueryText })(SearchToStateContainer);