import React from 'react';
import '../CommonStyles/Button/Button.css';
import s from './Auth.module.css';

const Auth = (props) => {
    return (
        <div className={s.auth}>
            <div className={s.message}>{props.currentMessage}</div>
            <input
                className={s.email}
                type='email'
                placeholder='Почта'
                value={props.currentMail}
                onChange={props.changeCurrentMail}
            />
            <input
                className={s.password}
                type="password"
                placeholder='Пароль'
                value={props.currentPass}
                onChange={props.changeCurrentPass}
            />
            <div
                className={`button ${s.submit}`}
                onClick={props.setUser}
            >
                Подтвердить
            </div>
        </div>
    );
}

export default Auth;