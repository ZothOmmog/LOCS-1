import React from 'react';
import { ButtonColored } from './button-colored';

export default {
  title: 'molecules__ButtonColored',
  component: ButtonColored,
};

export const Inactive = () => (
    <ButtonColored>
        Цветная кнопка
    </ButtonColored>
);

export const Active = () => (
    <ButtonColored active>
        Цветная кнопка
    </ButtonColored>
);