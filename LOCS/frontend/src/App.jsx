import React from 'react';
import { connect } from 'react-redux';
import { Routes } from '~/pages';

function AppView({ isAuth, setMeThunk }) {
    setMeThunk();

    return (
        isAuth !== null ? (
            <Routes />
        ) : 'Идет загрузка...'
    );
}

const mapStateToProps = (state) => ({
    isAuth: false
});

const mapDispathToProps = (dispatch) => ({
    setMeThunk: () => {}
});

export const App = connect(mapStateToProps, mapDispathToProps)(AppView);
