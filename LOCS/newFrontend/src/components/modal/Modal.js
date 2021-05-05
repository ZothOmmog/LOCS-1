import React from 'react';

import "./Modal.css"
import closeIcon from "./close.svg"

import SignIn from "../signin/SignIn"
import SignUp from "../signup/SignUp"



const Modal = ({active, setActive, switchModalComponent}) => {
    const renderSwitch = (param)=> {
        switch(param){ /// Заменить на возврат компонентов!!!!
            case "SignUp":
                return <SignUp setActiveModal={setActive}/>;
        
            break;
            case "SignIn":
                return <SignIn setActiveModal={setActive}/>;

            break;
            default:
                setActive(false)
            break;
        }
    };
    return (
      <div className={active ? "modal active" : "modal"} onClick={()=>setActive(false)}>
          <div className={active ? "modal-content active" : "modal-content"} onClick={e => e.stopPropagation()}>
                <img className="modal-content-cross" src={closeIcon} onClick={()=>setActive(false)}/>
            {renderSwitch(switchModalComponent)}
          </div>
      </div>  
    );
}

export default Modal;