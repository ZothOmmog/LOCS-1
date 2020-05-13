import React from 'react';
import s from './NavButton.module.scss';
import { NavLink } from 'react-router-dom';


export const NavButton = (props) => {
    let type = s.Button;
    
    type += (
        props.style.type === 'ProfileHeader' ? (' ' + s.Button_Style_ProfileHeader) :
        props.style.type === 'ProfileHeaderActive' ? (' ' + s.Button_Style_ProfileHeaderActive) :
        props.style.type === 'ProfileFooter' ? (' ' + s.Button_Style_ProfileFooter) :
        props.style.type === 'ProfileFooterActive' ? (' ' + s.Button_Style_ProfileFooterActive) : (' ' + s.Button_Style_Base)
    );

    type += (
        props.style.size === 'FullContainer' ? (' ' + s.Button_Size_FullContainer) : (' ' + s.Button_Size_Base)
    );

    return (
        <NavLink
            className={type}
            to={props.style.path}
        >
            {props.style.buttonText}
        </NavLink>
    )
}