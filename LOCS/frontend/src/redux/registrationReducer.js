const UPDATE_NICK = "UPDATE_NICK";
const UPDATE_MAIL = "UPDATE_MAIL";
const UPDATE_PASS = "UPDATE_PASS";
const ADD_NEW_USER = "ADD_NEW_USER";

const initialState = {
    nick: "",
    mail: "",
    pass: ""
}

const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NICK:
            return { ...state, nick: action.nick };
        case UPDATE_MAIL:
            return { ...state, mail: action.mail };
        case UPDATE_PASS:
            return { ...state, pass: action.pass };
        case ADD_NEW_USER:
            return { 
                ...state,
                nick: "",
                mail: "",
                pass: ""
            };
        default:
            return state;
    }
}

export const updateNick = (newNick) => {
    return {
        type: UPDATE_NICK,
        nick: newNick
    };
};
export const updateMail = (newMail) => {
    return {
        type: UPDATE_MAIL,
        mail: newMail
    };
};
export const updatePass = (newPass) => {
    return {
        type: UPDATE_PASS,
        pass: newPass
    };
};
export const registration = (newNick, newMail, newPass) => {
    return {
        type: ADD_NEW_USER,
        event: {
            nick: newNick,
            mail: newMail,
            pass: newPass
        }
    };
}

export default registrationReducer;