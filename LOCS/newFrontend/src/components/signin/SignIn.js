import React, {useState} from 'react';
import './SignIn.css'
import iconAccept from "./task.svg"

import {getCookie} from "services/getCookie"

const SignIn = ({setActiveModal}) =>{
    
    const [error, setError] = useState('');
   


    const submitSignIn = async (e) => {
        e.preventDefault();
        
        const response = await fetch('/user/login', {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({ 
				"mail": e.target[0].value,
				"pas": e.target[1].value
		    })
        })
        
        const status = await response.status;
        switch(status){
            case 200:
                setError("");
                setTimeout(setActiveModal(false),1500)
            break;
            case 400:
                setError("Неверный логин или пароль")
            break;
        }
    }

    if(getCookie("userId")==undefined){
        return (
            <div className="form-wrap">
                <h2>Вход в Locs</h2>
                <form  onSubmit={submitSignIn} className = "signIn-form">
                    <input required className={error ? 'invalid': null} type = "email" name="SignIn-email" placeholder = "Ваш e-mail" ></input>
                    <input required className={error ? 'invalid': null} type = "password" name="SignIn-password" placeholder = "Ваш пароль" ></input>
                    <label className={error ? 'form-error-message': 'form-error-message hidden'}>{error}</label>
                    <button type = "submit">Войти</button>  
                </form>
            </div>
        );
    }else{
        return (
            <div className="form-wrap-answer">
                <img src={iconAccept}/>
                Вы успешно авторизированы!
            </div>)
    }

}
export default SignIn