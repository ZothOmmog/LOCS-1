import React from 'react';
import s from './AddEvent.module.css';
import '../CommonStyles/Button/Button.css';


const AddEvent = (props) => {
    const onNameNewEventChange = (e) => {
        props.updateNameNewEvent(e.target.value);
    }
    const onTagsNewEventChange = (e) => {
        props.updateTagsNewEvent(e.target.value);
    }
    const onInfoNewEventChange = (e) => {
        props.updateInfoNewEvent(e.target.value);
    }
    const onSubmitButtonClick = () => {
        props.addNewEvent(
            props.state.nameNewEvent, 
            props.state.tagNewEvent, 
            props.state.infoNewEvent
        );
        alert("Мероприятие успешно добавлено!");
    }

    return (
        <div className={s.AddEvent + ' ' + s.AddEventOutherWrapper}>
            <div className={s.AddEventInnerWrapper}>
                <input
                    className={s.AddEvent__Input}
                    type="text"
                    placeholder="Название мероприятия"
                    value={props.state.nameNewEvent}
                    onChange={onNameNewEventChange}
                />
                <input
                    className={s.AddEvent__Input}
                    type="text"
                    placeholder="Тэги мероприятия"
                    value={props.state.tagNewEvent}
                    onChange={onTagsNewEventChange}
                />
                <textarea
                    className={s.AddEvent__TextArea}
                    placeholder="Информация о мероприятии"
                    value={props.state.infoNewEvent}
                    onChange={onInfoNewEventChange}
                />
                <div
                    className={s.AddEvent__Button + " button"}
                    onClick={onSubmitButtonClick}
                >
                    Добавить Мероприятие
                </div>
            </div>
        </div>
    );
}

export default AddEvent;