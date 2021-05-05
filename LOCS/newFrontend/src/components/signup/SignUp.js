import React, {useState} from 'react';
import './SignUp.css'
import iconAccept from "./profile.svg"


const SignUp = ({setActiveModal}) =>{
    const[errors, setErrors] = useState({
        mail:0,
        nick:0,
        pas:0
    })
    const[isComplited,setIsComplited] = useState(false);

    const submitSignUp = async (e) => {
        e.preventDefault();
        


        if(e.target[2].value !== e.target[3].value){
            setErrors(errors =>({...errors, pas:1}))
            setErrors(errors =>({...errors, nick:0}))
            setErrors(errors =>({...errors, mail:0}))

            return;
        }else{
            setErrors(errors =>({...errors, pas:0}))
        }

        const response = await fetch('/user/registration', {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({ 
				"mail": e.target[0].value,
				"nick": e.target[1].value,
				"pas": e.target[2].value
		    })
        })
        
        const status = response.status;
        switch(status){
            case 200:
                setErrors({});
                setIsComplited(true);
                setTimeout(setActiveModal(false),1500)
            
            break;
            case 400:
                let responseErr = await response.json();
                console.log(responseErr)
                if(responseErr.checkMail===0)
                    setErrors(errors => ({...errors, mail:1}))
                else
                    setErrors(errors =>({...errors, mail:0}))
                if(responseErr.checkNick===0)
                    setErrors(errors =>({...errors, nick:1}))
                else
                    setErrors(errors =>({...errors, nick:0}))
            break;
        }
    }

    if(isComplited){
        return (<div className="form-wrap-answer">
         <img src={iconAccept}/>
                Вы успешно зарегистрированы!  
        </div>)
    }
    else{
        return (
            <div className="form-wrap">
                <h2>Регистрация</h2>
                <form onSubmit={submitSignUp} className = "signUp-form">
                
                    <input required className={errors.mail ? 'invalid': null} type = "email" name = "SignUp-email" placeholder = "Ваш e-mail"></input>
                    <label className={errors.mail ? "form-error-message":"form-error-message hidden"}>Такой ящик уже существует</label>
                    
                    <input required className={errors.nick ? 'invalid': null} type = "text" name = "SignUp-nickname" placeholder = "Ваш никнейм" ></input>  
                    <label className={errors.nick ? "form-error-message":"form-error-message hidden"}>Такой никнейм уже существует</label>
                
                    <input required type = "password" name = "SignUp-password" placeholder = "Ваш пароль"></input>  
                   
                    <input required className={errors.pas ? 'invalid': null} type = "password" name = "SignUp-password-repeat" placeholder = "Повторите пароль"></input>
                    <label className={errors.pas ? "form-error-message":"form-error-message hidden"} >Пароли не совпадают</label>
                   
                    <button type="submit"> Зарегистрироваться </button>  
                </form>
            </div>
        );
    }
}
export default SignUp