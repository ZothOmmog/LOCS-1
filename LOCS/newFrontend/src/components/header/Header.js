import React from 'react';
import logo from './logo.svg';
import './Header.css';

import HeaderProfile from "../headerProfile/HeaderProfile"
import UnauthorizedMenu from "../unauthorizedMenu/UnauthorizedMenu"
import {getCookie} from "services/getCookie"

function Header({setModalActive,setSwitchModalComponent}){
  if(getCookie("userId")==undefined){
    return(
      <header className="Header">
        <div className ='Header-profile-wrap'>
          <img src={logo} className="Header-logo" alt="logo" />
            <h2>Locs</h2>
        </div>
        <UnauthorizedMenu setModalActive={setModalActive} setSwitchModalComponent={setSwitchModalComponent}/>
      </header>
      );
    }else{
      return(
      <header className="Header">
        <div className ='Header-profile-wrap'>
          <img src={logo} className="Header-logo" alt="logo" />
            <h2>Locs</h2>
        </div>
        
        <HeaderProfile/>
      </header>
      );
    }  
}
export default Header;