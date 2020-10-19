import React from 'react';
import classNames from 'classnames';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import style from './formik-datepicker.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import './react-datepicker-restyle.scss';
import { useField } from 'formik';

registerLocale('ru', ru);

export const FormikDatePicker = ({ placeholder, ...outherProps }) => {
    const [field, meta, helpers] = useField(outherProps);
    const { value } = meta;
    const { setValue } = helpers;

    return (
        <div className={style['_']}>
            <DatePicker
                {...field}
                placeholderText={placeholder}
                selectsStart={new Date()}
                selected={value}
                dateFormat='dd.MM.yyyy HH:mm'
                locale='ru'
                calendarClassName={style['formik-datepicker']}
                onChange={(date) => setValue(date)}
                showTimeSelect
                timeFormat='HH:mm'
                customInput={
                    <input
                        className={classNames(style['__formik-datepicker-input-custom'], {
                            [style['_error']]: meta.touched && meta.error,
                        })}
                    />
                }
            />
            {meta.touched && meta.error ? (
                <div className={style['__error-text']}>
                    {meta.error}
                </div>
            ): null}
        </div>
    );
};
