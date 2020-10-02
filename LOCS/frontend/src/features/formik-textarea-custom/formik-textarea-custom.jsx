import React from 'react';
import style from './formik-textarea-custom.module.scss';
import classNames from 'classnames';
import { useField } from 'formik';

export const FormikTextareaCustom = ({ className, errorClassName, ...outher }) => {
    const [field, meta] = useField(outher);

    return (
        <textarea
            className={classNames(
                style['formik-textarea-custom'],
                { [className]: className },
                { [style['_error']]: meta.touched && meta.error && !errorClassName },
                { [errorClassName]: meta.touched && meta.error && errorClassName }
            )}
            {...outher}
            {...field}
        />
    );
};