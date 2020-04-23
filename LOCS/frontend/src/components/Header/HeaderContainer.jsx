import React from 'react';
import "../CommonStyles/Link/Link.css";
import { Header } from './Header';
import { connect } from 'react-redux';
import { setUser, setMeThunk } from '../../redux/authReducer';
// import { userAPI } from '../../api/api';

class HeaderToApiContainer extends React.Component {
	componentDidMount() {
		this.props.setMeThunk();
	}

	render() {
		return <Header isAuth={this.props.isAuth} nick={this.props.nick} />;
	}
}


const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	nick: state.auth.user.nick
});

export const HeaderContainer = connect(mapStateToProps, { setUser, setMeThunk })(HeaderToApiContainer);