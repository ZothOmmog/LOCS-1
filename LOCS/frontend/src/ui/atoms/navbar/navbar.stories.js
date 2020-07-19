import React from 'react';
import { Navbar } from './navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavLinkBordered } from '~/ui/molecules';

export default {
  title: 'atoms__Navbar',
  component: Navbar,
};

export const Redular = () => (
    <Router>
        <Navbar>
            <NavLinkBordered to='/'>
                Все события
            </NavLinkBordered>
            <NavLinkBordered to='/'>
                Концерты
            </NavLinkBordered>
            <NavLinkBordered to='/'>
                Театр
            </NavLinkBordered>
            <NavLinkBordered to='/'>
                Ещё
            </NavLinkBordered>
        </Navbar>
    </Router>
);