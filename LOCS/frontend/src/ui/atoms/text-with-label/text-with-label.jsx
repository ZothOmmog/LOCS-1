import React from 'react';
import style from './style.module.scss';
import classNames from 'classnames';

export const TextWithLabel = ({ label, text, className, labelClassName, textClassName }) => (
    <div className={classNames(
        style['text-with-label'],
        { [className]: className }
    )}>
        <div className={classNames(
            style['__label'],
            { [labelClassName]: labelClassName }
        )}>
            {label}
        </div>
        <div className={classNames(
            style['__text'],
            { [textClassName]: textClassName }
        )}>
            {text}
        </div>
    </div>
);