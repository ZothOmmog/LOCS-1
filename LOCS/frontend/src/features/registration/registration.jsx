import React, { useState } from 'react';
import * as Yup from 'yup';
import style from './registration.module.scss';
import { PopupWindow } from '../popup-window';
import { Formik } from 'formik';
import { ButtonBlack, ButtonBordered } from '~/ui/molecules';
import { useDispatch, useSelector } from 'react-redux';
import { FormikInputCustom } from '../formik-input-custom';
import { RegistrationTemplate } from './registration-template';
import { authSelectors, authThunks } from '~/redux/common-slices/auth-slice';
import { FormikTextError } from '../formik-text-error';
import { useEffect } from 'react';
// import { FormikTextError } from '../formik-text-error';

const REQUIRED_HINT = 'Обязательно для ввода';

const regSchema = Yup.object().shape({
    nick: Yup
        .string()
        .required(REQUIRED_HINT),
    mail: Yup
        .string()
        .email('Некорректный email')
        .required(REQUIRED_HINT),
    confirmMail: Yup
        .string()
        .email('Некорректный email')
        .equals([Yup.ref('mail')], 'Почты не совпадают')
        .required(REQUIRED_HINT),
    password: Yup
        .string()
        .required(REQUIRED_HINT),
    confirmPassword: Yup
        .string()
        .equals([Yup.ref('password')], 'Пароли не совпадают')
});

export const Registration = () => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const errorReg = useSelector(authSelectors.errorReg);
    const [tryReg, setTryReg] = useState(false);

    const dispatch = useDispatch();
    const fetchReg = (mail, nick, password) => dispatch(authThunks.fetchReg({ mail, nick, password }));

    useEffect(() => {
        if (tryReg && !errorReg) setIsOpenPopup(false);
        else setTryReg(false);
    }, [tryReg, errorReg]);

    return (
        <div>
            <ButtonBordered
                onClick={() => setIsOpenPopup(!isOpenPopup)}
                active={isOpenPopup}
            >
                Регистрация
            </ButtonBordered>
            <PopupWindow
                isOpen={isOpenPopup}
                setIsOpen={setIsOpenPopup}
                windowClass={style['login-popup']}
            >
                <Formik
                    initialValues={{ mail: '', confirmMail: '', nick: '', password: '', confirmPassword: '' }}
                    validationSchema={regSchema}
                    onSubmit={({ mail, nick, password }, { setSubmitting }) => {
                        setSubmitting(true);
                        fetchReg(mail, nick, password).then(() => {
                            setTryReg(true);
                            setSubmitting(false);
                        });
                    }}
                >
                    {({ isSubmitting }) => (
                        <RegistrationTemplate>
                            <FormikTextError error={errorReg} touched />
                            <FormikInputCustom
                                name='nick'
                                placeholder='Никнейм'
                            />
                            <FormikInputCustom
                                name='mail'
                                placeholder='Почта'
                            />
                            <FormikInputCustom
                                name='confirmMail'
                                placeholder='Повторите почту'
                            />
                            <FormikInputCustom
                                name='password'
                                placeholder='Пароль'
                                type='password'
                                className={style['__password']}
                            />
                            <FormikInputCustom
                                name='confirmPassword'
                                placeholder='Повторите пароль'
                                type='password'
                                className={style['__password']}
                            />
                            <ButtonBlack
                                type="submit"
                                disabled={isSubmitting}
                                className={style['__submit']}
                            >
                                Зарегистрироваться
                            </ButtonBlack>
                        </RegistrationTemplate>
                    )}
                </Formik>
            </PopupWindow>
        </div>
    );
}