import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormikTextError } from '../formik-text-error';

export const FormikServerError = ({ errorSelector, errorChanged, fieldsNames, ...otherProps }) => {
    const error = useSelector(errorSelector);
    
    const dispatch = useDispatch();
    const removeError = useCallback(() => dispatch(errorChanged('')), [dispatch, errorChanged]);

    useEffect(() => {
        return removeError;
    }, [removeError]);

    return (
        <FormikTextError {...otherProps} touched error={error} />
    );
};
