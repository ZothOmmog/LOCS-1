import React from 'react';
import { connect } from 'react-redux';
import { Registration } from './Registration';
import {
    updateNick,
    updateMail,
    updatePass,
    registration
} from '../../redux/registrationReducer';
import { userAPI } from '../../api/api';

class RegistrationToApiContainer extends React.Component {
    componentDidMount() {

    }

    componentWillUnmount() {
        this.props.updateMail('');
        this.props.updateNick('');
        this.props.updatePass('');
    }

    registration(nick, mail, pass) {
        userAPI.registration(nick, mail, pass).then(isReg => {
            const nickFlag = isReg.Login.NickNameFlag;
            const mailFlag = isReg.Login.MailFlag;

            const message = nickFlag && mailFlag ? 'Пользователь успешно загеристрирован!' : 
                            nickFlag && !mailFlag ? 'почта уже зарегистрирована другим пользователем' :
                           !nickFlag && mailFlag ? 'ник уже зарегистрирован другим пользователем!' :
                            'Почта и ник уже зарегистрированы!';
            alert(message);

        }, err => console.log(err));
    }

    render() {
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
    { updateNick, updateMail, updatePass, registration })(RegistrationToApiContainer);