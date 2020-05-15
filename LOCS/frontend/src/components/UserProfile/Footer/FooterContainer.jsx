import { connect } from 'react-redux';
import { Footer } from './Footer';
import { logoutMeThunk } from '../../../redux/authReducer';

export const FooterContainer = connect(null, { logoutMeThunk })(Footer);