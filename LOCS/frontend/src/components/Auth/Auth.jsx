import React from 'react';
import '../CommonStyles/Button/Button.css';
import s from './Auth.module.css';

const Auth = (props) => {
    return (
        <div className={s.Auth + ' ' + s.AuthOutherWrapper}>
            <div className={s.AuthInnerWrapper}>
                <h1 className={s.Auth__Title}>Вход</h1>
                <div className={s.Auth__Message}>{props.currentMessage}</div>
                <input
                    className={s.Auth__Input}
                    type='email'
                    placeholder='Почта'
                    value={props.currentMail}
                    onChange={props.changeCurrentMail}
                />
                <input
                    className={s.Auth__Input}
                    type="password"
                    placeholder='Пароль'
                    value={props.currentPass}
                    onChange={props.changeCurrentPass}
                />
                <div
                    className={`button ${s.Auth__Button}`}
                    onClick={props.setUser}
                >
                    Подтвердить
                </div>
            </div>
        </div>
    );
}

export default Auth;