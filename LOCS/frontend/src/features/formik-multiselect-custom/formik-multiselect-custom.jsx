import React from 'react';
import style from './formik-multiselect-custom.module.scss';
import './react-select-restyle.scss';
import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';
import { FormikTextError } from '../formik-text-error';
import Select from 'react-select';

export const FormikMultiselectCustom = ({ items, wrapperClassName, className, ...outherProps }) => {
    const [field, meta, helpers] = useField(outherProps);
    const { touched } = useFormikContext();
    const { value } = meta;
    const { setValue } = helpers;

    const multiTouched = meta.touched != null || touched['react-select-3-input'];
    
    return (
        <div className={wrapperClassName}>
            <Select
                {...field}
                value={value}
                onChange={(selectedItems) => setValue(selectedItems || [])}
                isMulti
                placeholder='Тэги'
                noOptionsMessage={() => 'Пусто'}
                isValidNewOption={(_inputValue, selectValue) => selectValue.length < 6}
                styles={{
                    option: (styles, { isDisabled, isFocused, isSelected }) => ({
                        ...styles,
                        transitionDuration: '0.2s',
                        cursor: 'pointer',
                        backgroundColor: isDisabled
                            ? null
                            : isSelected
                            ? '#f7c331'
                            : isFocused
                            ? '#fbde8c'
                        : null,
                        ':active': {
                            backgroundColor: isDisabled ? null : '#f7c331'
                        },
                        ':disabled': {
                            backgroundColor: null
                        }
                    }),
                    valueContainer: styles => ({
                        ...styles,
                        cursor: 'text'
                    }),
                    control: styles => ({
                        ...styles,
                        borderColor: multiTouched && meta.error ? 'red !important' : null
                    })
                }}
                options={items.sort(({ label: labelA }, { label: labelB }) =>
                    labelA < labelB ? -1 : labelA === labelB ? 0 : 1
                )}
                className={classNames(style['_'], { [className]: className })}
                classNamePrefix='formik-multiselect-custom'
            />
            <FormikTextError  touched={multiTouched} error={meta.error} />
        </div>
    );
};
