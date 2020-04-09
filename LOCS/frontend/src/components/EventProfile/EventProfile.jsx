import React from 'react';
import Event from '../Lenta/Event/Event'

const EventProfile = (props) => {
    return (
        <Event
            id={props.id}
            name={props.name}
            type={props.type}
            info={props.info}
        />
    );
}

export default EventProfile;