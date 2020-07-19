import React from 'react';
import s from './NavButton.module.scss';
import { NavLink } from 'react-router-dom';


export const NavButton = ({ style: { value }, size, className, path, buttonText, ...outher }) => {
    let ownClassName = s.Button;
    
    ownClassName += (
        value === 'ProfileHeader' ? (' ' + s.Button_Style_ProfileHeader) :
        value === 'ProfileHeaderActive' ? (' ' + s.Button_Style_ProfileHeaderActive) :
        value === 'NotBorderRadius' ? (' ' + s.Button_Style_NotBorderRadius) :
        value === 'ProfileFooter' ? (' ' + s.Button_Style_ProfileFooter) :
        value === 'ProfileFooterActive' ? (' ' + s.Button_Style_ProfileFooterActive) :
        value === 'SearchNavigation' ? (' ' + s.Button_Style_SearchNavigation) :
        value === 'SearchNavigationActive' ? (' ' + s.Button_Style_SearchNavigationActive) : (' ' + s.Button_Style_Base)
    );

    ownClassName += (
        size === 'FullContainer' ? (' ' + s.Button_Size_FullContainer) : (' ' + s.Button_Size_Base)
    );

    return (
        <NavLink
            className={ownClassName + ' ' + className}
            to={path}
            {...outher}
        >
            {buttonText}
        </NavLink>
    )
}