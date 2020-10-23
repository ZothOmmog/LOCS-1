import { Form } from 'formik';
import React from 'react';
import style from './create-event-form-template.module.scss';

export const CreateEventFormTemplate = ({ children }) => (
    <Form className={style['form']}>
        <div className={style['__name-link']}>
            {children[0]}
            {children[1]}
        </div>
        <div className={style['__description-left']}>
            {children[2]}
            <div className={style['__right']}>
                <div>
                    <div className={style['__right-top']}>
                        {children[3]}
                        <div className={style['__right-top-date-price']}>
                            {children[4]}
                            {children[5]}
                        </div>
                    </div>
                    {children[6]}
                </div>
                <div className={style['__right-bottom']}>
                    {children[7]}
                <div className={style['__loader']}>
                    {children[8]}
                </div>
                </div>
            </div>
        </div>
    </Form>
);