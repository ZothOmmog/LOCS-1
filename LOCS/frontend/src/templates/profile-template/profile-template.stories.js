import React from 'react';
import { ProfileTemplate } from './profile-template';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'templates__ProfileTemplate',
  component: ProfileTemplate,
};



export const Redular = () => (
    <Router>
        <ProfileTemplate />
    </Router>
);