import React from 'react';
import profilePic from './user.svg';
import './HeaderProfile.css';
import useSWR from 'swr'
import { render } from '@testing-library/react';



function HeaderProfile(){
    const {data:profileData} = useSWR("/user")
    
    if(!profileData){
        return(
            <div className ='Header-profile-wrap'></div>
        )
    }else{
        return(
            <div className ='Header-profile-wrap'>   
                <div className ="Header-button-profile">
                    <a
                    className="Header-link-header"
                    href="#"
                    rel="noopener noreferrer"
                    >
                    {profileData.nick}
                    </a> 
                </div>
                <div className="Header-profile-container">
                    <img src={profileData.urlPicture!=-1 ? profileData.urlPicture:profilePic} className="Header-profile" alt="profile" />
                </div>
            </div>
        );
    }
    
}
export default HeaderProfile;
