import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavLinkCustom } from './nav-link-custom';

export default {
  title: 'atoms__NavLinkCustom',
  component: NavLinkCustom,
};

export const Regular = () => (
    <Router>
        <NavLinkCustom to='#'>
            NavLinkCustom
        </NavLinkCustom>
    </Router>
);

export const WithCustomClassName = () => (
    <Router>
        <NavLinkCustom to='#' className='custom-class-name'>
            NavLinkCustom
        </NavLinkCustom>
    </Router>
);