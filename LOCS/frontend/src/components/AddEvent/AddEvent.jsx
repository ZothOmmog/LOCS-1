import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as yup from 'yup';
import s from './AddEvent.module.scss';
import { Button } from '../Button-bem/Button';

const CustomInput = (props) => {
    const [field, meta] = useField(props);

    const className = (
        s.Registration__Field +
        (meta.touched && meta.error ? (
            ' ' + s.Registration__Field_Error
        ) : '')
    );
    
    return (
        <>
            <input className={className} {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={s.Registration__Error}>
                    {meta.error}
                </div>
            ) : null}
        </>
    );
}
const CustomTextArea = (props) => {
    const [field, meta] = useField(props);

    const className = (
        s.Registration__Field +
        ' ' + s.Registration__Field_TextArea +
        (meta.touched && meta.error ? (
            ' ' + s.Registration__Field_Error
        ) : '')
    );
    
    return (
        <>
            <textarea className={className} {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={s.Registration__Error}>
                    {meta.error}
                </div>
            ) : null}
        </>
    );
}

export const AddEvent = ({ eventId }) => {
    return (
        <Formik
            enableReinitialize
            initialValues={{ name: '', tags: '', info: '', price: '' }}
            validationSchema={yup.object({
                name: yup.string()
                    .required('*Обязательно'),
                tags: yup.string()
                    .required('*Обязательно'),
                info: yup.string()
                    .required('*Обязательно'),
                price: yup.string()
                    .required('*Обязательно')
            })}
            onSubmit={(values, { setSubmitting }) => {
                alert('Тут отправка события на сервер');
                setSubmitting(false);
            }}
        >
            <Form className={s.Form}>
                <CustomInput
                    name='name'
                    type='text'
                    placeholder='Название мероприятия'
                />
                <CustomInput
                    name='tags'
                    type='text'
                    placeholder='Название мероприятия'
                />
                <CustomTextArea
                    name='info'
                    placeholder='Информация о мероприятии'
                />
                <CustomInput
                    name='price'
                    type='text'
                    placeholder='Название мероприятия'
                />
                <Button
                    style={{
                        buttonText: 'Создать'
                    }}
                />
            </Form>
        </Formik>
    );
}