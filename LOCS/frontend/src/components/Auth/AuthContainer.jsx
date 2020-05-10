import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Auth from './Auth';
import { setUser, changeCurrentMail, changeCurrentPass, setUserThunk, changeCurrentMessage } from '../../redux/authReducer';

class AuthToApiContainer extends React.Component {
    componentWillUnmount() {
        this.props.changeCurrentMail('');
        this.props.changeCurrentMessage('');
        this.props.changeCurrentPass('');
    }

    setUser = () => {
        const mail = this.props.auth.page.currentMail;
        const pass = this.props.auth.page.currentPass;

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
        return this.props.auth.isAuth ? <Redirect to='/Lenta' /> : (
            <Auth
                currentMail={this.props.auth.page.currentMail}
                currentPass={this.props.auth.page.currentPass}
                currentMessage={this.props.auth.page.currentMessage}
                setUser={this.setUser}
                changeCurrentMail={this.changeCurrentMail}
                changeCurrentPass={this.changeCurrentPass}
                changeCurrentMessage={this.changeCurrentMessage}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export const AuthContainer = connect(mapStateToProps, { 
    setUser, changeCurrentMail, changeCurrentPass, 
    setUserThunk, changeCurrentMessage })(AuthToApiContainer);