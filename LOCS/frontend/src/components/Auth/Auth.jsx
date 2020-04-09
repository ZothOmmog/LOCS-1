import React from 'react';
import '../CommonStyles/Button/Button.css';

const Auth = (props) => {
    return (
        <div>
            <div><input
                type='email'
                placeholder='email'
                value={props.currentMail}
                onChange={props.changeCurrentMail}
            /></div>
            <div><input
                type="password"
                placeholder='password'
                value={props.currentPass}
                onChange={props.changeCurrentPass}
            /></div>
            <div className='button' onClick={props.setUser}>Подтвердить</div>
        </div>
    );
}

export default Auth;