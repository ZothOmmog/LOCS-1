import { Formik } from 'formik';
import React from 'react';
import { FormikInputCustom } from '~/features/formik-input-custom';
import { FormikTextareaCustom } from '~/features/formik-textarea-custom';
import { ButtonColored } from '~/ui';
import { RegistrationOrganizerFormTemplate } from './registration-organizer-form-template';
import style from './registration-organizer-form.module.scss';
import * as Yup from 'yup';
import { MAX_HINT, REQUIRED_HINT } from '~/helpers/common-hints';

const regOrgShema = Yup.object().shape({
    organizationName: Yup.string().required(REQUIRED_HINT),
    organizationLink: Yup.string(),
    info: Yup.string().required(REQUIRED_HINT).max(600, MAX_HINT(600))
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
            validationSchema={regOrgShema}
        >
            <RegistrationOrganizerFormTemplate>
                <FormikInputCustom name='organizationName' wrapperClassName={style['__organizationName']} placeholder='Название организатора' />
                <FormikInputCustom name='organizationLink' wrapperClassName={style['__organizationLink']} placeholder='Ссылка на сайт организатора (не обязательно)' />
                <FormikTextareaCustom name='info' wrapperClassName={style['__info']} placeholder='Описание организатора (макс. 400 символов)' />
                <ButtonColored type='submit'>Зарегистрировать</ButtonColored>
            </RegistrationOrganizerFormTemplate>
        </Formik>
    );
};