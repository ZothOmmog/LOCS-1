import { Form } from 'formik';
import React from 'react';
import style from './registration-organizer-form-template.module.scss';

export const RegistrationOrganizerFormTemplate = ({ children }) => {

    return (
        <Form className={style['_']}>
            <div className={style['__server-error']}>
                {children[0]}
            </div>
            <div className={style['__name-link']}>
                    {children[1]}
                    {children[2]}
            </div>
            {children[3]}
            <div className={style['__submit']}>{children[4]}</div>
            {children[5]}
        </Form>
    );
};