import React, { useState } from 'react';
import * as Yup from 'yup';
import classNames from 'classnames';
import style from './style.module.scss';
import { ButtonColored } from '~/ui';
import { PopupWindow } from '../popup-window';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ButtonBlack } from '~/ui/molecules';
import { useDispatch } from 'react-redux';
import { authThunks } from '~/redux/common-slices/auth-slice';

const loginSchema = Yup.object().shape({
    login: Yup.string().email('Некорректный email').required('Обязательно для ввода'),
    password: Yup.string().required('Обязательно для ввода')
});

export const Login = () => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);

    const dispatch = useDispatch();
    const fetchLogin = (login, password) => {
        dispatch(authThunks.fetchLogin({ login, password }));
    };

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
                            fetchLogin(login, password);
                            setSubmitting(false);
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <div className={style['__inner']}>
                                    <Field 
                                        type='text'
                                        name='login'
                                        className={classNames(
                                            style['__field'],
                                            { [style['__field_error']]: errors.login && touched.login }
                                        )}
                                        placeholder='Логин'
                                    />
                                    <div className={style['__error-message']}>
                                        <ErrorMessage name='login' component='div' className={style['__error-message-text']} />
                                    </div>
                                    <Field 
                                        type='password'
                                        name='password'
                                        className={classNames(
                                            style['__field'],
                                            { [style['__field_error']]: errors.password && touched.password }
                                        )}
                                        placeholder='Пароль'
                                    />
                                    <div className={style['__error-message']}>
                                        <ErrorMessage name='password' component='div' className={style['__error-message-text']}/>
                                    </div>
                                    <ButtonBlack type="submit" disabled={isSubmitting} className={style['__submit']}>
                                        Войти
                                    </ButtonBlack>
                                </div>
                            </Form>
                        )}
                    </Formik>
            </PopupWindow>
        </div>
    );
}