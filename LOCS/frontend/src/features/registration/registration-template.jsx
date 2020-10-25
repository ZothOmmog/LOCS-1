import React from 'react';
import style from './registration-template.module.scss';
import { Form } from 'formik';

export const RegistrationTemplate = ({ children }) => (
    <Form>
        <div className={style['__inner']}>
            <div className={style['__item']}>{children[0]}</div>
            <div className={style['__item']}>{children[1]}</div>
            <div className={style['__item']}>{children[2]}</div>
            <div className={style['__item']}>{children[3]}</div>
            <div className={style['__item']}>{children[4]}</div>
            <div className={style['__item']}>{children[5]}</div>
            <div className={style['__item']}>{children[6]}</div>
        </div>
    </Form>
);