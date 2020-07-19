import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavLinkColored } from './nav-link-colored';

export default {
  title: 'molecules__NavLinkColored',
  component: NavLinkColored,
};

export const Regular = () => (
    <Router>
        <NavLinkColored to='#'>
            NavLinkColored
        </NavLinkColored>
    </Router>
);

export const Active = () => (
    <Router>
        <NavLinkColored to='#' active>
            NavLinkColored
        </NavLinkColored>
    </Router>
);