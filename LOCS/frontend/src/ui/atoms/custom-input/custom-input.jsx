import React from 'react';
import style from './custom-input.module.scss';
import classNames from 'classnames';

export const CustomInput = ({ className, ...outherProps }) => (
    <input 
        className={classNames(
            style['_'],
            { [className]: className }
        )}
        {...outherProps}
    />
);