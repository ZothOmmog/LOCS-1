import React from 'react';
import { UserProfile } from "./UserProfile";
import { connect } from "react-redux";
import { logoutMeThunk } from "../../redux/authReducer";
import { withAuthRedirect } from "../../hoc/indexHoc";
import { setUserByIdThunk } from '../../redux/userProfileReducer';
import { searchClear } from '../../redux/searchReducer';

const mapStateToProps = (state) => ({
    isFind: state.userProfilePage.isFind,
    nick: state.userProfilePage.nick,
    mail: state.userProfilePage.mail,
    city: state.userProfilePage.city,
    urlPicture: state.userProfilePage.urlPicture,
    friendStatus: state.userProfilePage.friendStatus
});

class UserProfileAuthContainer extends React.Component {
    logoutMe = () => {
        this.props.searchClear();
        this.props.logoutMeThunk();
    }
    
    render() {
        this.props.setUserByIdThunk(this.props.route.userId);

        if(!this.props.isFind) return <div>Пользователь не найден</div>;
        return <UserProfile {...this.props} logoutMe={this.logoutMe} />;
    }
}

const UserProfileAuthContainerWithProps = connect(mapStateToProps, { setUserByIdThunk, logoutMeThunk, searchClear })(UserProfileAuthContainer);

export const UserProfileContainer = withAuthRedirect(UserProfileAuthContainerWithProps, false);