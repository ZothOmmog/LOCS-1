import { Formik } from 'formik';
import React from 'react';
import { FormikInputCustom } from '~/features/formik-input-custom';
import { FormikTextareaCustom } from '~/features/formik-textarea-custom';
import { ButtonColored } from '~/ui';
import { RegistrationOrganizerFormTemplate } from './registration-organizer-form-template';
import style from './registration-organizer-form.module.scss';
import * as Yup from 'yup';



const regOrgShema = Yup.object().shape({
    organizationName: Yup.string().required('')
});

export const RegistrationOrganizerForm = () => {

    return (
        <Formik
            initialValues={{
                organizationName: '',
                info: '',
                organizationLink: '',
                logo: ''
            }}
        >
            <RegistrationOrganizerFormTemplate>
                <FormikInputCustom name='organizationName' wrapperClassName={style['__organizationName']} placeholder='Название организатора' />
                <FormikInputCustom name='organizationLink' wrapperClassName={style['__organizationLink']} placeholder='Ссылка на сайт организатора' />
                <FormikTextareaCustom name='info' wrapperClassName={style['__info']} placeholder='Описание организатора' />
                <ButtonColored type='submit'>Зарегистрировать</ButtonColored>
            </RegistrationOrganizerFormTemplate>
        </Formik>
    );
};