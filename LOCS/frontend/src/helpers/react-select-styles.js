export const reactSelectStyles = {
    option: (styles, { isDisabled, isFocused, isSelected }) => ({
        ...styles,
        fontFamily: 'Roboto, sans-serif',
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
        },
    }),
    valueContainer: styles => ({
        ...styles,
        cursor: 'text'
    }),
    control: (styles, { isFocused }) => ({
        ...styles,
        borderRadius: '30px',
        border: '2px solid #1d1e22',
        boxShadow: isFocused ? '0px 0px 0px 3px #f7c331' : null,
        fontFamily: 'Roboto, sans-serif',
        fontSize: '$font-size-sm',
        transitionDuration: '0.2s',
        ':hover': {
            border: '2px solid #1d1e22',
            boxShadow: isFocused ? null : '0px 0px 0px 3px #dcc7aa',
        }
    }),
    singleValue: styles => ({
        ...styles,
        fontFamily: 'Roboto, sans-serif'
    }),
    placeholder: styles => ({
        ...styles,
        fontFamily: 'Roboto, sans-serif'
    }),
    dropdownIndicator: styles => ({
        ...styles,
        cursor: 'pointer',
        ':hover': {
            color: '#f7882f'
        }
    }),
    noOptionsMessage: styles => ({
        ...styles,
        fontFamily: 'Roboto, sans-serif'
    })
};