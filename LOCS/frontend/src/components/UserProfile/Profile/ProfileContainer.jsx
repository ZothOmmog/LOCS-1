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
                userId={this.props.userId}
                nick={this.props.nick}
                mail={this.props.mail}
                city={this.props.city}
                urlPicture={this.props.urlPicture}
            />
        ) : 'Сожалеем, пользователь с таким ID не найден :(' : 'Загрузка...';
    }
}

const mapStateToProps = (state) => ({
    userId: state.userProfilePage.userId,
    isFind: state.userProfilePage.isFind, 
    nick: state.userProfilePage.nick,
    mail: state.userProfilePage.mail,
    city: state.userProfilePage.city,
    urlPicture: state.userProfilePage.urlPicture
});

export const ProfileContainer = connect(mapStateToProps, { setUserByIdThunk, clean })(ProfileToApiContainer);