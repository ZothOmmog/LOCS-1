import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavLinkMap } from './nav-link-map';

export default {
  title: 'molecules__NavLinkMap',
  component: NavLinkMap,
};

export const Regular = () => (
    <Router>
        <NavLinkMap to='#' />
    </Router>
);

export const Active = () => (
    <Router>
        <NavLinkMap to='#' active />
    </Router>
);