import { connect } from 'react-redux';
import Search from './Search';
import { updateQueryTextActionCreator } from '../../redux/searchReducer';

const mapStateToProps = (state) => {
    return {
        state: state.searchPage
   }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onQueryTextChange(queryText) {
            const updateQueryText = updateQueryTextActionCreator(queryText);
            dispatch(updateQueryText);
        }
    }
}

export const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);