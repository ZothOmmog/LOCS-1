import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Registration } from './Registration';
import {
    updateNick,
    updateMail,
    updatePass,
    updateIsReg,
    registrationThunk,
    updateMessage,
    updateSubmitPass
} from '../../redux/registrationReducer';

class RegistrationToApiContainer extends React.Component {
    componentWillUnmount() {
        this.props.updateMail('');
        this.props.updateNick('');
        this.props.updatePass('');
        this.props.updatePass('');
        this.props.updateSubmitPass('');
        this.props.updateIsReg(false);
    }

    onNickChange = (e) => {
        this.props.updateNick(e.target.value);
    };

    onMailChange = (e) => {
        this.props.updateMail(e.target.value);
    };

    onPassChange = (e) => {
        this.props.updatePass(e.target.value);
    };

    onSubmitPassChange = (e) => {
        this.props.updateSubmitPass(e.target.value);
    };

    onSubmitButtonClick = (e) => {
        const nick = this.props.state.nick;
        const mail = this.props.state.mail;
        const pass = this.props.state.pass;
        const submitPass = this.props.state.submitPass;

        this.props.registrationThunk(nick, mail, pass, submitPass);
    };

    render() {
        if (this.props.state.isReg) return <Redirect to={'/Auth'} />;

        return <Registration
            state={this.props.state}
            onNickChange={this.onNickChange}
            onMailChange={this.onMailChange}
            onPassChange={this.onPassChange}
            onSubmitPassChange={this.onSubmitPassChange}
            onSubmitButtonClick={this.onSubmitButtonClick}
        />
    }
}

const mapStateToProps = (state) => {
    return {
        state: state.registrationPage
    };
}
export const RegistrationContainer = connect(mapStateToProps, {
    updateNick, updateMail, updatePass, 
    updateMessage, updateIsReg, updateSubmitPass, registrationThunk
})(RegistrationToApiContainer);