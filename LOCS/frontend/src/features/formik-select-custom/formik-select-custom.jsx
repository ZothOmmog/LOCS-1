import React, { useCallback } from 'react';
import style from './formik-select-custom.module.scss';
import classNames from 'classnames';
import { useField } from 'formik';
import { FormikTextError } from '../formik-text-error';
import Select, { components } from 'react-select';
import { reactSelectStyles } from '~/helpers';

export const FormikSelectCustom = ({ items, wrapperClassName, className, onInputChange, name, ...outherProps }) => {
    const [field, meta, helpers] = useField(name);
    const { setValue } = helpers;

    const Input = useCallback(props => (
        <components.Input {...props} name={field.name} />
    ), [field.name]);

    return (
        <div className={wrapperClassName}>
            <Select
                {...field}
                value={items.find(item => item.value === +field.value)}
                components={{ Input }}
                onChange={(selectedItems) => {
                    setValue(selectedItems ? selectedItems.value.toString() : '');
                }}
                onInputChange={text => {
                    if (text) {
                        if (onInputChange) onInputChange(text);
                    }
                }}
                
                noOptionsMessage={() => 'Пусто'}
                isValidNewOption={(_inputValue, selectValue) => selectValue.length < 6}
                styles={{
                    ...reactSelectStyles,
                    control: (styles, { isFocused }) => ({
                        ...reactSelectStyles.control(styles, { isFocused }),
                        border: meta.touched && meta.error ? '2px solid red' : '2px solid #1d1e22',
                        ':hover': {
                            ...reactSelectStyles.control(styles, { isFocused })[':hover'],
                            border: meta.touched && meta.error 
                            ? '2px solid red' 
                            : reactSelectStyles.control(styles, { isFocused })[':hover'].border
                        }
                    })
                }}
                options={items.sort(({ label: labelA }, { label: labelB }) =>
                    labelA < labelB ? -1 : labelA === labelB ? 0 : 1
                )}
                className={classNames(style['_'], { [className]: className })}
                classNamePrefix='formik-select-custom'
                {...outherProps}
            />
            <FormikTextError  touched={meta.touched} error={meta.error} />
        </div>
    );
};
