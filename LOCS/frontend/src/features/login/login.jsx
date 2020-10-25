import React, { useState } from 'react';
import * as Yup from 'yup';
import style from './style.module.scss';
import { ButtonColored } from '~/ui';
import { PopupWindow } from '../popup-window';
import { Form, Formik } from 'formik';
import { ButtonBlack } from '~/ui/molecules';
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authThunks } from '~/redux/common-slices/auth-slice';
import { FormikInputCustom } from '../formik-input-custom';
import { FormikTextError } from '../formik-text-error';
import { useOpenLoginWithSuccessReg } from '../registration/index';

const loginSchema = Yup.object().shape({
    login: Yup.string().email('Некорректный email').required('Обязательно для ввода'),
    password: Yup.string().required('Обязательно для ввода')
});

export const Login = () => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const isAuth = useSelector(authSelectors.isAuthSelector);
    const [errorLogin, setErrorLogin] = useState('');

    const dispatch = useDispatch();
    const fetchLogin = (login, password) => dispatch(authThunks.fetchLogin({ login, password }));

    const messageFromReg = useOpenLoginWithSuccessReg(setIsOpenPopup);

    return (
        <div>
            <ButtonColored
                onClick={() => setIsOpenPopup(!isOpenPopup)}
                active={isOpenPopup}
            >
                Вход
            </ButtonColored>
            <PopupWindow
                isOpen={isOpenPopup}
                setIsOpen={setIsOpenPopup}
                windowClass={style['login-popup']}
            >
                <Formik
                    initialValues={{ login: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={({ login, password }, { setSubmitting }) => {
                        setSubmitting(true);
                        fetchLogin(login, password).then(() => {
                            if (!isAuth) setErrorLogin('Неверный логин или пароль');
                            setSubmitting(false);
                        });
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className={style['__inner']}>
                                <div className={style['__message']}>
                                    {messageFromReg}
                                </div>
                                <FormikInputCustom  name='login' placeholder='Логин' />
                                <FormikInputCustom  name='password' placeholder='Пароль' type='password' className={style['__password']} />
                                <ButtonBlack type="submit" disabled={isSubmitting} className={style['__submit']}>
                                    Войти
                                </ButtonBlack>
                                <FormikTextError error={errorLogin} touched={true} />
                            </div>
                        </Form>
                    )}
                </Formik>
            </PopupWindow>
        </div>
    );
}