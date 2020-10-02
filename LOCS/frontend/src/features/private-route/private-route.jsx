import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { authSelectors } from '~/redux/common-slices/auth-slice';

export const PrivateRoute = (props) => {
    const isAuth = useSelector(authSelectors.isAuthSelector);
    return isAuth ? <Route {...props} /> : <Redirect to='/' />;
}