import { Form } from 'formik';
import React from 'react';
import style from './registration-organizer-form-template.module.scss';

export const RegistrationOrganizerFormTemplate = ({ children }) => {

    return (
        <Form className={style['_']}>
            <div className={style['__name-link']}>
                    {children[0]}
                    {children[1]}
            </div>
            {children[2]}
            <div className={style['__submit']}>{children[3]}</div>
            {children[4]}
        </Form>
    );
};