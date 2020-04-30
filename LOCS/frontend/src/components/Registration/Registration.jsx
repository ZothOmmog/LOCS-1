import React from 'react';
import s from './Registration.module.css';
import '../CommonStyles/Button/Button.css';


export const Registration = (props) => {
    return (
        <div className={s.Registration + ' ' + s.RegistrationOutherWrapper}>
            <div className={s.RegistrationInnerWrapper}>
                <h1 className={s.Registration__Title}>Регистрация</h1>
                <div className={s.Registration__Message}>
                    {props.state.message}
                </div>
                <input
                    className={s.Registration__Input}
                    type="text"
                    placeholder="Никнейм"
                    value={props.state.nick}
                    onChange={props.onNickChange}
                />
                <input
                    className={s.Registration__Input}
                    type="email"
                    placeholder="Адрес электронной почты"
                    value={props.state.mail}
                    onChange={props.onMailChange}
                />
                <input
                    className={s.Registration__Input}
                    type="password"
                    placeholder="Пароль"
                    value={props.state.pass}
                    onChange={props.onPassChange}
                />
                <input
                    className={s.Registration__Input}
                    type="password"
                    placeholder="Повторите пароль"
                    value={props.state.submitPass}
                    onChange={props.onSubmitPassChange}
                />
                <div
                    className={"button " + s.Registration__Button}
                    onClick={props.onSubmitButtonClick}
                >
                    Зарегистрироваться
                </div>
            </div>
        </div>
    );
}