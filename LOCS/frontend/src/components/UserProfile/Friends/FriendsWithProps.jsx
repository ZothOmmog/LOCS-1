import { Friends } from "./Friends";
import { connect } from "react-redux";
import { setFriendsThunk, cleanFriends } from "../../../redux/indexReducers";
import { compose } from 'redux';
import { withSetDataAndCleanData } from '../../../hoc/withSetDataAndCleanData';
import { changeCurrentPageFriendsThunk } from "../../../redux/friendsReducer";
import { withBackPath } from "../../../hoc/indexHoc";

const mapStateToProps = (state) => ({
    Friends: state.friends.friends,
    pages: state.friends.pages,
    currentPage: state.friends.currentPage
});

const changeCurrentPageFriends = changeCurrentPageFriendsThunk('Friends');

export const FriendsContainer = compose(
    connect(mapStateToProps, { changeCurrentPageFriends }),
    withSetDataAndCleanData(setFriendsThunk, cleanFriends),
    withBackPath('/UserProfile/me/Friends')
)(Friends);