import React from 'react';
import { Header } from './header';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'organisms__Header',
  component: Header,
};

export const Main = () => (
    <Router>
        <Header isAuth={false} path='/' />
    </Router>
);

export const Login = () => (
    <Router>
        <Header isAuth={false} path='/login' />
    </Router>
);

export const Registration = () => (
    <Router>
        <Header isAuth={false} path='/registration' />
    </Router>
);

export const Profile = () => (
    <Router>
        <Header isAuth={true} name='UserName' path='/profile' />
    </Router>
);