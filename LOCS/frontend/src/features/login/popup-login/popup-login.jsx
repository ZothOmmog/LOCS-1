import React from 'react';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, Form } from 'formik';
// import style from './style.module.scss';
import { PopupWindow } from '~/features/popup-window';

const loginSchema = Yup.object().shape({
    login: Yup.string().required('Обязательно для ввода'),
    password: Yup.string().required('Обязательно для ввода')
});

export const PopupLogin = (props) => {
    return (
        <PopupWindow
            {...props}
        >
            <Formik
                initialValues={{ email: '', password: '' }}
                validateSchema={loginSchema}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type='text' name='login' />
                        <ErrorMessage name='login' component='div' />
                        <Field type='text' name='password' />
                        <ErrorMessage name='password' component='div' />
                        <button type="submit" disabled={isSubmitting}>
                            Войти
                        </button>
                    </Form>
                )}
            </Formik>
        </PopupWindow>
    );
}