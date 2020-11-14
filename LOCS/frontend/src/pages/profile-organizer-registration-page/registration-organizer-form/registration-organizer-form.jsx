import { Formik } from 'formik';
import React from 'react';
import { FormikInputCustom } from '~/features/formik-input-custom';
import { FormikTextareaCustom } from '~/features/formik-textarea-custom';
import { ButtonColored } from '~/ui';
import { RegistrationOrganizerFormTemplate } from './registration-organizer-form-template';
import style from './registration-organizer-form.module.scss';
import * as Yup from 'yup';
import { MAX_HINT, REQUIRED_HINT } from '~/helpers/common-hints';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, authSelectors, authThunks } from '~/redux/common-slices/auth-slice';
import { FormikTextError } from '~/features/formik-text-error';
import { FormikServerError } from '~/features/formik-server-error';

const regOrgShema = Yup.object().shape({
    organizationName: Yup.string().required(REQUIRED_HINT),
    organizationLink: Yup.string(),
    info: Yup.string().required(REQUIRED_HINT).max(600, MAX_HINT(600))
});

export const RegistrationOrganizerForm = () => {
    const dispatch = useDispatch();
    const regOrg = (info, orgName, orgLink, logoLink) => dispatch(
        authThunks.fetchOrgReg({ info, orgName, orgLink, logoLink })
    );

    return (
        <Formik
            initialValues={{
                organizationName: '',
                info: '',
                organizationLink: '',
                logo: ''
            }}
            validationSchema={regOrgShema}
            onSubmit={({ organizationName, info, organizationLink, logo }, { setSubmitting }) => {
                setSubmitting(true);
                regOrg(info, organizationName, organizationLink, logo).then((resolve) => {
                    console.log(resolve);
                    setSubmitting(false);
                });
            }}
        >
            {({ isSubmitting }) => (
                <RegistrationOrganizerFormTemplate>
                    <FormikServerError touched={true} errorSelector={authSelectors.errorRegOrg} errorChanged={authActions.errorRegOrgChanged} />
                    <FormikInputCustom name='organizationName' wrapperClassName={style['__organizationName']} placeholder='Название организатора' />
                    <FormikInputCustom name='organizationLink' wrapperClassName={style['__organizationLink']} placeholder='Ссылка на сайт организатора (не обязательно)' />
                    <FormikTextareaCustom name='info' className={style['__info-input']} wrapperClassName={style['__info']} placeholder='Описание организатора (макс. 400 символов)' />
                    <ButtonColored type='submit' disabled={isSubmitting}>Зарегистрировать</ButtonColored>
                    <div style={{ opacity: isSubmitting ? 100 : 0 }}>Идёт регистрация...</div>
                </RegistrationOrganizerFormTemplate>
            )}
        </Formik>
    );
};