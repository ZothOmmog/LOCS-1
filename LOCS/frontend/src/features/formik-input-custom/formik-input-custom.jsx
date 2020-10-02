import React from 'react';
import style from './formik-input-custom.module.scss';
import classNames from 'classnames';
import { useField } from 'formik';

export const FormikInputCustom = ({ className, errorClassName, ...outher }) => {
    const [field, meta] = useField(outher);

    return (
        <input 
            className={classNames(
                style['formik-input-custom'],
                { [className]: className },
                { [style['_error']]: meta.touched && meta.error && !errorClassName },
                { [errorClassName]: meta.touched && meta.error && errorClassName}
            )}
            {...field}
            {...outher}
        />
    );
};