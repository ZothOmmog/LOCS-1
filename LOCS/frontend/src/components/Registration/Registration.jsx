import React from 'react';
import s from './Registration.module.css';
import '../CommonStyles/Button/Button.css';


export const Registration = (props) => {
    const onNickChange = (e) => {
        props.updateNick(e.target.value);
    }
    const onMailChange = (e) => {
        props.updateMail(e.target.value);
    }
    const onPassChange = (e) => {
        props.updatePass(e.target.value);
    }
    const onSubmitButtonClick = () => {
        const nick = props.state.nick;
        const mail = props.state.mail;
        const pass = props.state.pass;

        props.registration(nick, mail, pass);
    }

    return (
        <div className={`${s.Registration}`}>
            <input
                className={s.nick}
                type="text"
                placeholder="Никнейм"
                value={props.state.nick}
                onChange={onNickChange}
            />
            <input
                className={s.mail}
                type="email"
                placeholder="Адрес электронной почты"
                value={props.state.mail}
                onChange={onMailChange}
            />
            <input
                className={s.pass}
                type="password"
                placeholder="Пароль"
                value={props.state.pass}
                onChange={onPassChange}
            />
            <div
                className={s.submit}
                onClick={onSubmitButtonClick}
            >
                <div className={"button"}>
                    Зарегистрироваться
                </div>
            </div>
        </div>
    );
}