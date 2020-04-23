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
        <div className={`${s.AddEvent}`}>
            <input
                className={s.name}
                type="text"
                placeholder="Название мероприятия"
                value={props.state.nameNewEvent}
                onChange={onNameNewEventChange}
            />
            <input
                className={s.tags}
                type="text"
                placeholder="Тэги мероприятия"
                value={props.state.tagNewEvent}
                onChange={onTagsNewEventChange}
            />
            <textarea
                className={s.info}
                placeholder="Информация о мероприятии"
                value={props.state.infoNewEvent}
                onChange={onInfoNewEventChange}
            />
            <div 
                className={s.submit}
                onClick={onSubmitButtonClick}
            >
                <div className={"button"}>
                    Добавить Мероприятие
                </div>
            </div>
        </div>
    );
}

export default AddEvent;