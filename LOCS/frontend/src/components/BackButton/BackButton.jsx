import React from 'react';
import { NavButton } from '../NavButton/NavButton';
import { connect } from 'react-redux';

class BackButton extends React.Component {
    render() {
        return <NavButton style={{ type: 'NotBorderRadius', path: this.props.path, buttonText: 'Назад' }} />
    }
}

const mapStateToProps = (state) => ({
    path: state.backButton.path
});

export const BackButtonWithProps = connect(mapStateToProps)(BackButton);