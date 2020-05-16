import { FriendRequestsIn } from "./FriendRequestsIn";
import { connect } from "react-redux";
import { setFriendRequestsInThunk, cleanFriends, setPathBack } from "../../../redux/indexReducers";
import { compose } from 'redux';
import { withSetDataAndCleanData } from '../../../hoc/withSetDataAndCleanData';
import { changeCurrentPageFriendsThunk } from "../../../redux/friendsReducer";
import { withBackPath } from "../../../hoc/indexHoc";

const mapStateToProps = (state) => ({
    friendRequestsIn: state.friends.friends,
    pages: state.friends.pages,
    currentPage: state.friends.currentPage
});

const changeCurrentPageFriendRequestsIn = changeCurrentPageFriendsThunk('friendRequestsIn');

export const FriendRequestsInContainer = compose(
    connect(mapStateToProps, { changeCurrentPageFriendRequestsIn, setPathBack }),
    withSetDataAndCleanData(setFriendRequestsInThunk, cleanFriends),
    withBackPath('/UserProfile/me/FriendRequestsIn')
)(FriendRequestsIn);
