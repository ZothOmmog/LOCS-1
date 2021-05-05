import React from 'react';


const UnauthorizedMenu = ({setModalActive,setSwitchModalComponent})=>{
    return(
        <div className ='Header-profile-wrap'>
          <div className ="Header-button-header">
            <a
              className="Header-link-header"
              
              rel="noopener noreferrer"
              onClick={()=>{setModalActive(true); setSwitchModalComponent("SignUp");}}
            >
            Регистрация
            </a>
          </div>
          <div className ="Header-button-header">
            <a
              className="Header-link-header"
              
              rel="noopener noreferrer"
              onClick={()=>{setModalActive(true); setSwitchModalComponent("SignIn");}}
            >
            Авторизация
            </a>
          </div>
        </div>
    )
}
export default UnauthorizedMenu;