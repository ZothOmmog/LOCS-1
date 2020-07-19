import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavLinkBordered } from './nav-link-bordered';

export default {
  title: 'molecules__NavLinkBordered',
  component: NavLinkBordered,
};

export const Regular = () => (
    <Router>
        <NavLinkBordered to='#'>
            NavLinkBordered
        </NavLinkBordered>
    </Router>
);

export const Active = () => (
    <Router>
        <NavLinkBordered to='#' active>
            NavLinkBordered
        </NavLinkBordered>
    </Router>
);