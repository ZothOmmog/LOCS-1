import React from 'react';
import style from './formik-text-error.module.scss';

export const FormikTextError = ({ touched, error }) => (
    touched && error ? (
        <div className={style['__error-text']}>
            {error}
        </div>
    ): null
);