import React from 'react';
import style from './create-event-form.module.scss';
import * as Yup from 'yup';
import classNames from 'classnames';
import { Formik } from 'formik';
import { FormikInputCustom } from '~/features/formik-input-custom';
import { FormikTextareaCustom } from '~/features/formik-textarea-custom';
import { FormikDatePicker } from '~/features/formik-datepicker';
import { FormikMultiselectCustom } from '~/features/formik-multiselect-custom';
import { useSelector } from 'react-redux';
import { tagsSelectors } from '~/redux/common-slices/tags-slice';
import { CreateEventFormTemplate } from './create-event-form-template';
import addDays from 'date-fns/addDays'
import { ButtonColored } from '~/ui';

const  REQUIRED_HINT = 'Обязательно для ввода';

const loginSchema = Yup.object().shape({
    idAddress: Yup.string().required(REQUIRED_HINT),
    name: Yup.string().required(REQUIRED_HINT),
    info: Yup.string().required(REQUIRED_HINT),
    price: Yup.number(),
    link: Yup.string(),
    tags: Yup.array().min(1, 'Событие должно иметь от 1 до 5 тэгов').max(5, 'Можно выбрать не более 5 тэгов').required(),
    date: Yup.date().typeError(REQUIRED_HINT).min(addDays(new Date(), 3), 'Не раньше, чем через 3 дня')
});

export const CreateEventForm = () => {
    const tags = useSelector(tagsSelectors.tagsSelector);

    const tagsForMultiselect = tags ? tags.map(tag => ({ value: tag.id, label: tag.name })) : [];

    return (
        <Formik
            initialValues={{
                idAddress: '',
                name: '',
                info: '',
                isPrise: false,
                price: '',
                link: '',
                tags: [],
                date: null
            }}
            validationSchema={loginSchema}
            onSubmit={({ idAddress, name, info, price, link, tags, date }, { setSubmitting }) => {
                console.error('Сабмит формы создания события не реализован')
            }}
        >
            <CreateEventFormTemplate>
                <FormikInputCustom name='name' placeholder='Название события'
                    wrapperClassName={classNames(style['__input'], style['__input-name'])}
                />
                <FormikInputCustom name='link' placeholder='Ссылка на событие (не обязательно)'
                    wrapperClassName={classNames(style['__input'], style['__input-link'])}
                />
                <FormikTextareaCustom name='info' placeholder='Описание'
                    className={classNames(style['__input'], style['__input-description'])}
                    wrapperClassName={classNames(style['__input'], style['__input-description'])}
                />
                <FormikInputCustom name='idAddress' placeholder='Адрес проведения' 
                    wrapperClassName={classNames(style['__input'], style['__input-address'])}
                />
                <FormikDatePicker name='date' placeholder='Дата проведения' />
                <FormikInputCustom name='price' placeholder='Цена (не обязательно)'
                    wrapperClassName={classNames(style['__input'], style['__input-prise'])}
                />
                <FormikMultiselectCustom items={tagsForMultiselect} name='tags' placeholder='Тэги' className={classNames(
                    style['__input'],
                    style['__input-tags']
                )}/>
                <ButtonColored type='Submit'>
                    Создать
                </ButtonColored>
            </CreateEventFormTemplate>
        </Formik>
    );
};