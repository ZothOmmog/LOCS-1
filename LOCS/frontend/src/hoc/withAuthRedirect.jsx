import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export const withAuthRedirect = (Component, condition) => {
    class ContainerComponent extends React.Component {
        render() {
            return  !this.props.isLoadingForStartApp ? condition ? this.props.isAuth ? <Redirect to='/Lenta' /> : <Component {...this.props} /> : 
                                                       !this.props.isAuth ? <Redirect to='/Lenta' /> : <Component {...this.props} /> :
                                            <div>Идет загрузка...</div>;
        }
    }

    const setStateToProps = (state) => ({
        isAuth: state.auth.isAuth,
        isLoadingForStartApp: state.auth.isLoadingForStartApp
    });

    return connect(setStateToProps)(ContainerComponent);
}