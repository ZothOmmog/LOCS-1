import React from 'react';
import { connect } from 'react-redux';
import Auth from './Auth';
import { setUser, changeCurrentMail, changeCurrentPass, setUserThunk, changeCurrentMessage } from '../../redux/authReducer';
import { withAuthRedirect } from '../../hoc/indexHoc.js';

class AuthToApiContainer extends React.Component {
    componentWillUnmount() {
        this.props.changeCurrentMail('');
        this.props.changeCurrentMessage('');
        this.props.changeCurrentPass('');
    }

    setUser = () => {
        const mail = this.props.auth.currentMail;
        const pass = this.props.auth.currentPass;

        this.props.setUserThunk(mail, pass);
    }

    changeCurrentMail = (e) => {
        const newMail = e.currentTarget.value;
        this.props.changeCurrentMail(newMail);
    }

    changeCurrentPass = (e) => {
        const newPass = e.currentTarget.value;
        this.props.changeCurrentPass(newPass);
    }

    changeCurrentMessage = (e) => {
        const currentMessage = e.currentTarget.value;
        this.props.changeCurrentMessage(currentMessage);
    }

    render() {
        return (
            <Auth
                currentMail={this.props.auth.currentMail}
                currentPass={this.props.auth.currentPass}
                currentMessage={this.props.auth.currentMessage}
                setUser={this.setUser}
                changeCurrentMail={this.changeCurrentMail}
                changeCurrentPass={this.changeCurrentPass}
                changeCurrentMessage={this.changeCurrentMessage}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth.page
});

export const AuthContainer = withAuthRedirect(connect(mapStateToProps, { 
    setUser, changeCurrentMail, changeCurrentPass, 
    setUserThunk, changeCurrentMessage })(AuthToApiContainer), true);