const UPDATE_NICK = "UPDATE_NICK";
const UPDATE_MAIL = "UPDATE_MAIL";
const UPDATE_PASS = "UPDATE_PASS";
const UPDATE_IS_REG = "UPDATE_IS_REG";
const ADD_NEW_USER = "ADD_NEW_USER";

const initialState = {
    nick: "",
    mail: "",
    pass: "",
    isReg: false
}

const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NICK:
            return { ...state, nick: action.nick };
        case UPDATE_MAIL:
            return { ...state, mail: action.mail };
        case UPDATE_PASS:
            return { ...state, pass: action.pass };
        case UPDATE_IS_REG:
            debugger;
            return { ...state, isReg: action.isReg }
        case ADD_NEW_USER:
            return {
                ...state,
                nick: "",
                mail: "",
                pass: "",
                isReg: true
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
export const updateIsReg = (isReg) => {
    return {
        type: UPDATE_IS_REG,
        isReg: isReg
    };
};
export const registration = () => {
    return {
        type: ADD_NEW_USER,
    };
}

export default registrationReducer;