import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Registration } from './Registration';
import {
    updateNick,
    updateMail,
    updatePass,
    registration,
    updateIsReg
} from '../../redux/registrationReducer';
import { userAPI } from '../../api/api';

class RegistrationToApiContainer extends React.Component {
    componentDidMount() {

    }

    componentWillUnmount() {
        this.props.updateMail('');
        this.props.updateNick('');
        this.props.updatePass('');
        this.props.updateIsReg(false);
    }

    registration = (nick, mail, pass) => {
        userAPI.registration(nick, mail, pass).then(isReg => {
            const nickFlag = isReg.Login.NickNameFlag;
            const mailFlag = isReg.Login.MailFlag;

            let message = '';

            if (nickFlag && mailFlag) {
                message = 'Пользователь успешно загеристрирован, введите данные, чтобы войти.';
                this.props.registration();
            }
            else {
                message = nickFlag && !mailFlag ? 'почта уже зарегистрирована другим пользователем' :
                    !nickFlag && mailFlag ? 'ник уже зарегистрирован другим пользователем!' :
                        'Почта и ник уже зарегистрированы!';
            }

            alert(message);
        }, err => console.log(err));
    }

    render() {
        if (this.props.state.isReg) return <Redirect to={'/Auth'} />;

        return <Registration
            state={this.props.state}
            updateMail={this.props.updateMail}
            updateNick={this.props.updateNick}
            updatePass={this.props.updatePass}
            registration={this.registration}
        />
    }
}

const mapStateToProps = (state) => {
    return {
        state: state.registrationPage
    };
}

export const RegistrationContainer = connect(mapStateToProps,
    { updateNick, updateMail, updatePass, updateIsReg, registration })(RegistrationToApiContainer);