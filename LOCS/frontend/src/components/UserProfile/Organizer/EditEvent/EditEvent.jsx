import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as yup from 'yup';
import s from './EditEvent.module.scss';
import { Button } from '../../../Button-bem/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import { eventAPI } from '../../../../api/api';
import { Redirect } from 'react-router-dom';
import { organizerApi } from '../../../../api/indexApi';

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

export const EditEvent = ({ eventId }) => {
    const [event, setEvent] = useState({
        id: eventId,
        name: '',
        tags: [{ id: '', title: '' }],
        info: '',
        ticketPrice: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isEdited, setIsEdited] = useState(false);
    const [tags, setTags] = useState(null);
    
    useEffect(function ininialGetEventFromServer() {
        
        const getEvent = async () => {
            const eventFromServer = await eventAPI.getEvent(event.id);
            const tagsFromServer = await eventAPI.getTags();
            let newTags = [];

            setEvent({
                id: event.id,
                name: eventFromServer.event.name,
                tags: eventFromServer.tags.eventtags ? eventFromServer.tags.eventtags.title : [{ id: '', title: 'Нет данных' }],
                info: eventFromServer.event.info,
                ticketPrice: eventFromServer.event.ticket_price
            });

            newTags = tagsFromServer.filter(
                tag => tag.tags.title === eventFromServer.tags[0].eventtags.title
            ).map(tag => ({
                value: tag.tags.id,
                text: tag.tags.title
            }));

            if(newTags.length === 0) newTags = [{ value: '', text: 'Нет данных' }];

            //Добавляем все остальные теги с правильной сигнатурой
            setTags(newTags.concat(tagsFromServer.filter(
                tag => tag.tags.title !== eventFromServer.tags[0].eventtags.title
            ).map(tag => ({
                value: tag.tags.id,
                text: tag.tags.title
            }))));
        }
        
        getEvent();
        
        setIsLoading(false);
    }, [event.id]);

    return isEdited ? <Redirect to='/UserProfile/me/Organizer/Events' /> : isLoading ? 'Загрузка...' : (
        <Formik
            enableReinitialize
            initialValues={{ name: event.name, tags: event.tags, info: event.info, price: event.ticketPrice }}
            validationSchema={yup.object({
                name: yup.string()
                    .required('*Обязательно'),
                tags: yup.string()
                    .required('*Обязательно'),
                info: yup.string()
                    .required('*Обязательно'),
                price: yup.number()
                    .typeError('*Только числа больше 0')
                    .required('*Обязательно')
                    .min(0, '*Только числа больше 0')
            })}
            onSubmit={(values, { setSubmitting }) => {
                const submitNewEvent = async (eventId, name, tags, info, prise) => {
                    const isAdded = await organizerApi.editEvent(eventId, 1, name, info, prise, 'expample', [{ id: tags }]);
                    if(!isAdded.err) alert('Мероприятие успешно изменено!');
                    else alert('Ошибка');
                }
                
                submitNewEvent(event.id, values.name, values.tags, values.info, values.price);
                
                setIsEdited(true);
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
                    placeholder='Название мероприятия'
                />
                <Button
                    style={{
                        buttonText: 'Изменить'
                    }}
                />
            </Form>
        </Formik>
    );
}