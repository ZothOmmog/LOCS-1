import React from 'react';
import { UserProfile } from "./UserProfile";
import { connect } from "react-redux";
import { logoutMeThunk } from "../../redux/authReducer";
import { withAuthRedirect } from "../../hoc/indexHoc";
import { setUserByIdThunk } from '../../redux/userProfileReducer';

const mapStateToProps = (state) => ({
    isFind: state.userProfilePage.isFind,
    nick: state.userProfilePage.nick,
    mail: state.userProfilePage.mail,
    city: state.userProfilePage.city,
    urlPicture: state.userProfilePage.urlPicture,
});

class UserProfileAuthContainer extends React.Component {
    componentDidMount() {
        this.props.setUserByIdThunk(this.props.route.userId);
    }

    render() {
        if(!this.props.isFind) return <div>Пользователь не найден</div>;
        return <UserProfile {...this.props} />;
    }
}

const UserProfileAuthContainerWithProps = connect(mapStateToProps, { setUserByIdThunk, logoutMeThunk })(UserProfileAuthContainer);

export const UserProfileContainer = withAuthRedirect(UserProfileAuthContainerWithProps, false);