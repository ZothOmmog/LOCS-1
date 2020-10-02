import React from 'react';
import { Checkbox } from '@material-ui/core';
import { useField } from 'formik';

export const FormikCheckboxCustom = (props) => {
    const [field] = useField({ ...props, type: 'checkbox' });

    return (
        <Checkbox
            inputProps={{ 'aria-label': 'Чекбокс платного события' }}
            {...field}
            {...props}
        />
    );
};