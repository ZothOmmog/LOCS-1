import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes } from '~/pages';
import { authSelectors, authThunks } from '~/redux/common-slices/auth-slice';
import { useEffect } from 'react';
import { Loader } from '../loader';

function AppView({ isLoading }) {
    

    return (
        <Loader isLoading={isLoading}>
            <Routes />
        </Loader>
    );
}

export const App = () => {
    const dispath = useDispatch();

    const isLoading = useSelector(authSelectors.isLoadingAuthSelector);

    useEffect(() => {
        dispath(authThunks.fetchAuth());
    }, [dispath]);

    return (
        <AppView isLoading={isLoading} />
    );
}
