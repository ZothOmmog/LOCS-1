import React from 'react';
import { connect } from 'react-redux';
import Auth from './Auth';
import { setUser, changeCurrentMail, changeCurrentPass, setUserThunk } from '../../redux/authReducer';

class AuthToApiContainer extends React.Component {
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

    render() {
        return (
            <Auth
                currentMail={this.props.auth.page.currentMail}
                currentPass={this.props.auth.page.currentPass}
                setUser={this.setUser}
                changeCurrentMail={this.changeCurrentMail}
                changeCurrentPass={this.changeCurrentPass}
            />
        );
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth
});

export const AuthContainer = connect(mapStateToProps, { 
    setUser, changeCurrentMail, changeCurrentPass, setUserThunk })(AuthToApiContainer);