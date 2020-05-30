import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as yup from 'yup';
import s from './EditEvent.module.scss';
import { Button } from '../../../Button-bem/Button';
import { useState } from 'react';
import { useEffect } from 'react';

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

export const EditEvent = ({ eventId }) => {
    const [event, setEvent] = useState({
        id: eventId,
        name: '',
        tags: '',
        info: '',
        ticketPrice: ''
    });
    
    useEffect(function ininialGetEventFromServer() {
        const getEvent = async () => {
            const eventsFromServer = [
                {
                    id: '1',
                    name: 'Dance Walking 2020',
                    tags: '#Танцы',
                    info: 'Мы приглашаем ВСЕХ-ВСЕХ на необычную прогулку по городу. Мы будем перемещаться все вместе по заранее выбранному маршруту, ТАНЦУЯ! Музыка будет звучать у каждого из плеера с общим плейлистом. Dance Walking - это простое и вдохновляющее танцевальное действие, в котором может участвовать каждый. Это возможность провести время легко и с удовольствием под открытым небом, наполняясь энергией полного вдоха. Возможность почувствовать свободу и сопричастность с другими в этом неординарном действе, встряхнуться от обыденности жизни и поделиться своим настроением с окружающими.',
                    ticketPrice: 'бесплатно'
                },
                {
                    id: '2',
                    name: 'Stand-Up On Tour',
                    tags: '#Концерты',
                    info: 'Концерт Алексея Квашонкина и Александра Малого, резидентов Stand-Up Club #1, в рамках большого тура. 4 июня в 19.00 ПЕРЕНОС КОНЦЕРТА (дата уточняется) Театр КТО (ул. Тургенева, 9А) 18+ ---------------------------------------------------------------------------- Кирилл Селегей отправляется в тур! Крутой молодой комик из московского Stand-up Club #1 приезжает в ваш город с интеллигентным и ироничным юмором про актуальные, но понятные всем вещи. ',
                    ticketPrice: '200 рублей'
                }
            ];

            setEvent( eventsFromServer.find( eventFromServer => eventFromServer.id === event.id ) );
        }

        getEvent();
    }, [event.id]);

    return (
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
                price: yup.string()
                    .required('*Обязательно')
            })}
            onSubmit={(values, { setSubmitting }) => {
                alert('Тут отправка изменений на сервер');
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
                        buttonText: 'Изменить'
                    }}
                />
            </Form>
        </Formik>
    );
}