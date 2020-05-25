import React from 'react';
import '../../../CommonStyles/Button/Button.css';                                                                                                                                                                                                           
import {  Formik } from 'formik';
import * as yup from 'yup';
import { Registration } from './Registration';

export const RegistrationContainer = (props) => {
    return (
        <Formik
            initialValues={{ name: '', info: '', orgLink: '', logoLink: '' }}
            validationSchema={yup.object({
                name: yup.string()
                    .max(20, '*Должно быть 20 символов или меньше')
                    .required('*Обязательно'),
                info: yup.string()
                    .required('*Обязательно'),
                orgLink: yup.string()
                    .max(40, '*Должно быть 40 символов или меньше'),
                logoLink: yup.string()
                    .max(40, '*Должно быть 40 символов или меньше')
            })}
            onSubmit={(values, { setSubmitting }) => {
                alert('Тут должен вызываться метод регистрации из АПИ');
                setSubmitting(false);
            }}
        >
            <Registration />
        </Formik>
    );
}