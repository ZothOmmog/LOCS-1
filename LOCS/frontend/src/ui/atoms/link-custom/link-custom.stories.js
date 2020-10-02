import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LinkCustom } from './link-custom';

export default {
  title: 'atoms__LinkCustom',
  component: LinkCustom,
};

export const Regular = () => (
    <Router>
        <LinkCustom to='#'>
            LinkCustom
        </LinkCustom>
    </Router>
);

export const WithCustomClassName = () => (
    <Router>
        <LinkCustom to='#' className='custom-class-name'>
            LinkCustom
        </LinkCustom>
    </Router>
);