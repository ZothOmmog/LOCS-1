import React, { useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as yup from 'yup';
import s from './AddEvent.module.scss';
import { Button } from '../Button-bem/Button';
import { useEffect } from 'react';
import { eventAPI } from '../../api/api';
import { organizerApi } from '../../api/indexApi';

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

const CustomSelect = (props) => {
    const [field, meta] = useField(props);

    const className = (
        s.Registration__Field +
        (meta.touched && meta.error ? (
            ' ' + s.Registration__Field_Error
        ) : '')
    );

    const options = props.options.map( option => (
    <option key={option.value} value={option.value}>{option.text}</option>) );
    
    return (
        <>
            <select className={className} {...field} {...props}>
            
            {options}
            </select>
            {meta.touched && meta.error ? (
                <div className={s.Registration__Error}>
                    {meta.error}
                </div>
            ) : null}
        </>
    );
}

export const AddEvent = ({ eventId }) => {
    const [tags, setTags] = useState('');

    useEffect(()=> {
        const setTagsFromServer = async () => {
            const tagsFromServer = await eventAPI.getTags();
            const newTags = [{ value: '', text: 'Тематика мероприятия' }];

            setTags(newTags.concat(tagsFromServer.map(tag => ({
                value: tag.tags.id,
                text: tag.tags.title
            }))));
        }

        setTagsFromServer();
    }, []);

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
                price: yup.number()
                    .typeError('*Только неотрицательные числа')
                    .required('*Обязательно')
                    .min(0, '*Только неотрицательные числа')
            })}
            onSubmit={(values, { setSubmitting }) => {
                const submitNewEvent = async (name, tags, info, prise) => {
                    const isAdded = await organizerApi.createEvent(1, name, info, prise, 'expample', [{ id: tags }]);
                    if(isAdded) alert('Мероприятие успешно добавлено!');
                    else alert('Подобное мероприятие уже существует');
                }

                submitNewEvent(values.name, +values.tags, values.info, values.price);
                setSubmitting(false);
            }}
        >
            <Form className={s.Form}>
                <CustomInput
                    name='name'
                    type='text'
                    placeholder='Название мероприятия'
                />
                <CustomSelect
                    name='tags'
                    options={tags || [{ value: '', text: '' }]}
                    placeholder='Тематика мероприятия'
                />
                <CustomTextArea
                    name='info'
                    placeholder='Информация о мероприятии'
                />
                <CustomInput
                    name='price'
                    type='text'
                    placeholder='Цена билета в рублях (если бесплатно, то 0)'
                />
                <Button
                    style={{ buttonText: 'Создать' }}
                    typeButton='submit'
                />
            </Form>
        </Formik>
    );
}