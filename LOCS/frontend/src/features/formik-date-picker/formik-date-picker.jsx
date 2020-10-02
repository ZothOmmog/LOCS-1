import { DateTimePicker } from '@material-ui/pickers';
import moment from "moment";
import 'moment/locale/ru';
import React, { useState } from 'react';
import style from './formik-date-picker.module.scss';


export const FormikDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(moment(new Date()).locale('ru'));
    
return (
    <DateTimePicker
        ampm={false} 
        variant='inline dialog' 
        disablePast={true} 
        value={selectedDate} 
        onChange={setSelectedDate}
        cancelLabel='Отмена'
        okLabel='Подтвердить'
    />
);
};