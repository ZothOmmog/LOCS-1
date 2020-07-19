import React from 'react';
import PropTypes from 'prop-types';
import { HeaderDefault } from '~/features';

export const DefaultTemplate = ({ children }) => (
    <div>
        <HeaderDefault />
        {children}
    </div>
);

DefaultTemplate.propTypes = {
    children: PropTypes.node.isRequired
};