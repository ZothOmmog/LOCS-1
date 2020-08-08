import React from 'react';
import { DefaultTemplate } from './default-template';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'templates__DefaultTemplate',
  component: DefaultTemplate,
};



export const Redular = () => (
    <Router>
        <DefaultTemplate>
            Пример дефолтного шаблона
        </DefaultTemplate>
    </Router>
);