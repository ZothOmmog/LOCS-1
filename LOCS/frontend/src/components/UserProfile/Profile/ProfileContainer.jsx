import React from 'react';
import { Profile } from './Profile';
import { connect } from 'react-redux';
import { setUserByIdThunk, clean } from '../../../redux/userProfileReducer';

export class ProfileToApiContainer extends React.Component {
    componentDidMount() {
        this.props.setUserByIdThunk(this.props.route.userId);
    }

    componentWillUnmount() {
        this.props.clean();
    }

    componentDidUpdate() {
        if(this.props.userId !== this.props.route.userId) {
            this.props.setUserByIdThunk(this.props.route.userId);
        }
    }

    render() {
        return this.props.isFind !== null ? this.props.isFind ? (
            <Profile
                friendStatus={this.props.friendStatus}
                userId={this.props.userId}
                nick={this.props.nick}
                mail={this.props.mail}
                city={this.props.city}
                urlPicture={this.props.urlPicture}
                myNick={this.props.myNick}
            />
        ) : 'Сожалеем, пользователь с таким ID не найден :(' : 'Загрузка...';
    }
}

const mapStateToProps = (state) => {
    return ({
    userId: state.userProfilePage.userId,
    isFind: state.userProfilePage.isFind,
    friendStatus: state.userProfilePage.friendStatus,
    nick: state.userProfilePage.nick,
    mail: state.userProfilePage.mail,
    city: state.userProfilePage.city,
    urlPicture: state.userProfilePage.urlPicture,
    myNick: state.auth.user.nick
});
}

export const ProfileContainer = connect(mapStateToProps, { setUserByIdThunk, clean })(ProfileToApiContainer);