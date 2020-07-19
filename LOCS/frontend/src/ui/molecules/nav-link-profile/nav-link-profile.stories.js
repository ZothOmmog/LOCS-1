import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavLinkProfile } from './nav-link-profile';

export default {
  title: 'molecules__NavLinkProfile',
  component: NavLinkProfile,
};

export const WithoutImg = () => (
    <Router>
        <NavLinkProfile to='#' name='ProfileName'/>
    </Router>
);

export const Active = () => (
    <Router>
        <NavLinkProfile to='#' name='ProfileName' active/>
    </Router>
);

export const WithImg = () => (
    <Router>
        <NavLinkProfile to='#' name='ProfileName' imgPath='https://avatarko.ru/img/kartinka/1/avatarko_anonim.jpg' />
    </Router>
);