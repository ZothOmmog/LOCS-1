import React from 'react';
import s from './Registration.module.scss';
import '../../../CommonStyles/Button/Button.css';                                                                                                                                                                                                           
import { Form, useField } from 'formik';
import { Button } from '../../../Button-bem/Button';

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

export const Registration = () => {

    return (
        <div className={s.Registration__OutherWrapper}>
            <Form className={s.Registration}>
                <h2>Регистрация организатора</h2>
                <CustomInput 
                    name='name'
                    type='text'
                    placeholder='Имя организации'
                />
                <CustomTextArea 
                    name='info'
                    placeholder='Информация об организации'
                />
                <CustomInput 
                    name='orgLink'
                    type='text'
                    placeholder='Ссылка на сайт организации'
                />
                <CustomInput 
                    name='logoLink'
                    type='text'
                    placeholder='Ссылка на логотип организации'
                />
                <div className={s.Registration__Submit}>
                    <Button
                        style={{ buttonText: 'Регистрация' }}
                        typeButton='submit'
                    />
                </div>
            </Form>
        </div>
    );
}