import React from 'react';
import style from './formik-textarea-custom.module.scss';
import classNames from 'classnames';
import { useField } from 'formik';
import { FormikTextError } from '../formik-text-error';

export const FormikTextareaCustom = ({ className, wrapperClassName, errorClassName, ...outher }) => {
    const [field, meta] = useField(outher);

    return (
        <div className={classNames(style['wrapper'], { [wrapperClassName]: wrapperClassName })}>
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
            <FormikTextError touched={meta.touched} error={meta.error} />
        </div>
    );
};