import { FriendRequestsOut } from "./FriendRequestsOut";
import { connect } from "react-redux";
import { setFriendRequestsOutThunk, cleanFriends } from "../../../redux/indexReducers";
import { compose } from 'redux';
import { withSetDataAndCleanData } from '../../../hoc/withSetDataAndCleanData';
import { changeCurrentPageFriendsThunk } from "../../../redux/friendsReducer";
import { withBackPath } from "../../../hoc/indexHoc";

const mapStateToProps = (state) => ({
    friendRequestsOut: state.friends.friends,
    pages: state.friends.pages,
    currentPage: state.friends.currentPage
});

const changeCurrentPageFriendRequestsOut = changeCurrentPageFriendsThunk('friendRequestsOut');

export const FriendRequestsOutContainer = compose(
    connect(mapStateToProps, { changeCurrentPageFriendRequestsOut }),
    withSetDataAndCleanData(setFriendRequestsOutThunk, cleanFriends),
    withBackPath('/UserProfile/me/FriendRequestsOut')
)(FriendRequestsOut);