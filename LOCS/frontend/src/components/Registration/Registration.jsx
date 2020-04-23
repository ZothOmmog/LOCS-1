import React from 'react';
import s from './Registration.module.css';
import '../CommonStyles/Button/Button.css';


export const Registration = (props) => {
    return (
        <div className={s.Registration}>
            <div className={s.message}>
                {props.state.message}
            </div>
            <input
                className={s.nick}
                type="text"
                placeholder="Никнейм"
                value={props.state.nick}
                onChange={props.onNickChange}
            />
            <input
                className={s.mail}
                type="email"
                placeholder="Адрес электронной почты"
                value={props.state.mail}
                onChange={props.onMailChange}
            />
            <input
                className={s.pass}
                type="password"
                placeholder="Пароль"
                value={props.state.pass}
                onChange={props.onPassChange}
            />
            <input
                className={s.submitPass}
                type="password"
                placeholder="Повторите пароль"
                value={props.state.submitPass}
                onChange={props.onSubmitPassChange}
            />
            <div
                className={s.submit}
                onClick={props.onSubmitButtonClick}
            >
                <div className={"button"}>
                    Зарегистрироваться
                </div>
            </div>
        </div>
    );
}