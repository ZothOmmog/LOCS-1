import React from 'react';
import style from './create-event-form.module.scss';
import * as Yup from 'yup';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import { FormikInputCustom } from '~/features/formik-input-custom';
import { FormikTextareaCustom } from '~/features/formik-textarea-custom';
import { FormikCheckboxCustom } from '~/features/formik-checkbox-custom';
import { FormikDatePicker } from '~/features/formik-date-picker';

const loginSchema = Yup.object().shape({
    login: Yup.string().email('Некорректный email').required('Обязательно для ввода'),
    password: Yup.string().required('Обязательно для ввода')
});

export const CreateEventForm = () => {

    return (
        <Formik
            initialValues={{
                idAddress: '',
                name: '',
                info: '',
                isPrise: false,
                price: '',
                link: '',
                tags: '',
                date: ''
            }}
            validationSchema={loginSchema}
            onSubmit={({ idAddress, name, info, price, link, tags, date }, { setSubmitting }) => {
                console.error('Сабмит формы создания события не реализован')
            }}
        >
            <Form className={style['form']}>
                <div className={style['__name-link']}>
                    <FormikInputCustom name='name' placeholder='Название события' className={classNames(
                        style['__input'],
                        style['__input-name']
                    )}/>
                    <FormikInputCustom name='link' placeholder='Ссылка на событие' className={classNames(
                        style['__input'],
                        style['__input-link']
                    )}/>
                </div>
                <div className={style['__description-left']}>
                    <FormikTextareaCustom name='info' placeholder='Описание' className={classNames(
                        style['__input'],
                        style['__input-description']
                    )}/>
                    <div className={style['__right']}>
                        <div>
                            {/* <FormikInputCustom name='date' placeholder='Дата' className={classNames(
                                style['__input'],
                                style['__input-date']
                            )}/> */}
                            <FormikDatePicker />
                            <FormikInputCustom name='tags' placeholder='Тэги' className={classNames(
                                style['__input'],
                                style['__input-tags']
                            )}/>
                        </div>
                        <div className={style['__prise']}>
                            <FormikInputCustom name='price' placeholder='Стоимость' className={classNames(
                                style['__input'],
                                style['__input-prise']
                            )}/>
                            <FormikCheckboxCustom name='isPrise' className={style['__input-isPrise']} />
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    );
};