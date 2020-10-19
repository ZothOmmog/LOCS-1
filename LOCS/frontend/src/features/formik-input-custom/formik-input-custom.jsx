import React from 'react';
import style from './formik-input-custom.module.scss';
import classNames from 'classnames';
import { useField } from 'formik';
import { CustomInput } from '~/ui/atoms';
import { FormikTextError } from '../formik-text-error';

export const FormikInputCustom = ({ className, wrapperClassName, errorClassName, ...outher }) => {
    const [field, meta] = useField(outher);

    return (
        <div className={classNames(style['_'], { [wrapperClassName]: wrapperClassName })}>
            <CustomInput 
                className={classNames(
                    style['__input'],
                    { [className]: className },
                    { [style['_error']]: meta.touched && meta.error && !errorClassName },
                    { [errorClassName]: meta.touched && meta.error && errorClassName}
                )}
                {...field}
                {...outher}
            />
            <FormikTextError touched={meta.touched} error={meta.error} />
        </div>
    );
};