import React from 'react';
import { UserProfile } from "./UserProfile";
import { withAuthRedirect } from "../../hoc/indexHoc";
import { connect } from 'react-redux';
// import { searchClear } from '../../redux/searchReducer';

class UserContainerWithClean extends React.Component {
    componentWillUnmount() {
        this.props.searchClear();
    }
    
    render() {
        return <UserProfile route={this.props.route} />;
    }
}

export const UserProfileContainer = withAuthRedirect(connect(null)(UserContainerWithClean), false);