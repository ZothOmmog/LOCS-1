import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export const withAuthRedirect = (Component, condition) => {
    class ContainerComponent extends React.Component {
        render() {
            return condition ? this.props.isAuth ? <Redirect to='/Lenta' /> : <Component {...this.props} /> : 
                               !this.props.isAuth ? <Redirect to='/Lenta' /> : <Component {...this.props} />;
        }
    }

    const setStateToProps = (state) => ({
        isAuth: state.auth.isAuth
    });

    return connect(setStateToProps)(ContainerComponent);
}