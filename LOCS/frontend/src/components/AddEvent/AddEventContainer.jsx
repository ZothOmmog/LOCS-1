import AddEvent from './AddEvent';
import { updateNameNewEventActionCreator, 
    updateTagsNewEventActionCreator,
    updateInfoNewEventActionCreator, 
    addNewEventActionCreator} from '../../redux/addEventReducer';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        state: state.addEventPage
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNameNewEvent(newName) {
            const changeNameNewEvent = updateNameNewEventActionCreator(newName);
            dispatch(changeNameNewEvent);
        },
        updateTagsNewEvent(newTag) {
            const changeTagsNewEvent = updateTagsNewEventActionCreator(newTag);
            dispatch(changeTagsNewEvent);
        },
        updateInfoNewEvent(newInfo) {
            const changeInfoNewEvent = updateInfoNewEventActionCreator(newInfo);
            dispatch(changeInfoNewEvent);
        },
        addNewEvent(newName, newTag, newInfo) {
            const addNewEvent = addNewEventActionCreator(newName, newTag, newInfo);
            dispatch(addNewEvent);
        }
    }
}

export const AddEventContainer = connect(mapStateToProps, mapDispatchToProps)(AddEvent);