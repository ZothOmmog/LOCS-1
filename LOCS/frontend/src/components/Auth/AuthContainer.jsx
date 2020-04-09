import React from 'react';
import { connect } from 'react-redux';
import Auth from './Auth';
import { setUser, changeCurrentMail, changeCurrentPass } from '../../redux/authReducer';
import { userAPI } from '../../api/api';

class AuthToApiContainer extends React.Component {
    setUser = () => {
        const mail = this.props.auth.page.currentMail;
        const pass = this.props.auth.page.currentPass;

        userAPI.login(mail, pass).then(res => {
            if(res.Login.Flag) {
                userAPI.setMe().then( res => {
                    this.props.setUser(res.user);
                    alert('Вы успешно авторизированы!');
                });
            }
            else alert('Неверно введены логин или пароль.');
        });
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

export const AuthContainer = connect(mapStateToProps, { setUser, changeCurrentMail, changeCurrentPass })(AuthToApiContainer);