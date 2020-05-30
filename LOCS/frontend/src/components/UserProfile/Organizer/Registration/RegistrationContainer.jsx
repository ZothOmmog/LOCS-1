import React from 'react';
import '../../../CommonStyles/Button/Button.css';                                                                                                                                                                                                           
import {  Formik } from 'formik';
import * as yup from 'yup';
import { Registration } from './Registration';
import { organizerApi } from '../../../../api/indexApi';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

export const RegistrationContainer = (props) => {
    const [isSignUpErr, setIsSignUpErr] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        isSignUp ? <Redirect to='/UserProfile/me/Organizer' /> :
        <Formik
            initialValues={{ name: '', info: '', orgLink: '', logoLink: '', signUpErr: '' }}
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
                const signUp = async (...args) => {
                    const isSignUp = await organizerApi.signUp(...args);

                    if(isSignUp) setIsSignUp(isSignUp);
                    else setIsSignUpErr(true);
                }

                signUp(
                    values.info, 
                    values.name, 
                    values.orgLink, 
                    values.logoLink
                );

                setSubmitting(false);
            }}
        >
            <Registration isSignUpErr={isSignUpErr} />
        </Formik>
    );
}