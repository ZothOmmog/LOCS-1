const UPDATE_NAME_NEW_EVENT = "UPDATE-NAME-NEW-EVENT";
const UPDATE_TAGS_NEW_EVENT = "UPDATE-TAGS-NEW-EVENT";
const UPDATE_INFO_NEW_EVENT = "UPDATE-INFO-NEW-EVENT";
const ADD_NEW_EVENT = "ADD-NEW-EVENT";

const initialState = {
    nameNewEvent: "",
    tagNewEvent: "",
    infoNewEvent: ""
}

const addEventReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE-NAME-NEW-EVENT":
            return { ...state, nameNewEvent: action.name };
        case "UPDATE-TAGS-NEW-EVENT":
            return { ...state, tagNewEvent: action.tag };
        case "UPDATE-INFO-NEW-EVENT":
            return { ...state, infoNewEvent: action.info };
        case "ADD-NEW-EVENT":
            return { 
                ...state, 
                nameNewEvent: "",
                tagNewEvent: "",
                infoNewEvent: ""
            };
        default:
            return state;
    }
}

export const updateNameNewEventActionCreator = (newName) => {
    return {
        type: UPDATE_NAME_NEW_EVENT,
        name: newName
    };
};
export const updateTagsNewEventActionCreator = (newTag) => {
    return {
        type: UPDATE_TAGS_NEW_EVENT,
        tag: newTag
    };
};
export const updateInfoNewEventActionCreator = (newInfo) => {
    return {
        type: UPDATE_INFO_NEW_EVENT,
        info: newInfo
    };
};
export const addNewEventActionCreator = (newName, newTag, newInfo) => {
    return {
        type: ADD_NEW_EVENT,
        event: {
            name: newName,
            type: newTag,
            info: newInfo
        }
    };
}

export default addEventReducer;