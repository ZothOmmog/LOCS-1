import React from 'react';
import { Header } from '~/ui';
import { useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';

export const HeaderDefault = () => {
    const location = useLocation();
    // const isAuth = useSelector( (state) => state.auth.isAuth ); TODO сделать, чтобы так работало
    const isAuth = false;

    return (
        <Header isAuth={isAuth} path={location.pathname} />
    );
}