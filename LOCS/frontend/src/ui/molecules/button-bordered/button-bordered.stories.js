import React from 'react';
import { ButtonBordered } from './button-bordered';

export default {
  title: 'molecules__ButtonBordered',
  component: ButtonBordered,
};

export const Inactive = () => (
    <ButtonBordered>
        Неактивная кнопка
    </ButtonBordered>
);

export const Active = () => (
    <ButtonBordered active>
        Активная кнопка
    </ButtonBordered>
);