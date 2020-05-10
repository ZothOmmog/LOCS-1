import { userAPI } from "../api/api";
import { changeCurrentMessage } from "./authReducer";

const UPDATE_NICK = "UPDATE_NICK";
const UPDATE_MAIL = "UPDATE_MAIL";
const UPDATE_PASS = "UPDATE_PASS";
const UPDATE_SUBMIT_PASS = "UPDATE_SUBMIT_PASS";
const UPDATE_IS_REG = "UPDATE_IS_REG";
const UPDATE_MESSAGE = "UPDATE_MESSAGE";
const ADD_NEW_USER = "ADD_NEW_USER";

const initialState = {
    nick: "",
    mail: "",
    pass: "",
    submitPass: "",
    message: "",
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
        case UPDATE_SUBMIT_PASS:
            return { ...state, submitPass: action.submitPass }
        case UPDATE_IS_REG:
            return { ...state, isReg: action.isReg }
        case UPDATE_MESSAGE:
            return { ...state, message: action.message }
        case ADD_NEW_USER:
            return {
                ...state,
                nick: "",
                mail: "",
                pass: "",
                submitPass: "",
                message: "",
                isReg: true
            };
        default:
            return state;
    }
}

export const registrationThunk = (nick, mail, pass, submitPass) => async (dispatch) => {
    const isReg = await userAPI.registration(nick, mail, pass);

    const nickFlag = isReg.Login.NickNameFlag;
    const mailFlag = isReg.Login.MailFlag;

    let message = '';
    if (nickFlag && mailFlag) {
        if (pass === submitPass) {
            message = 'Пользователь успешно загеристрирован, введите данные, чтобы войти.';
            dispatch(registration());
            dispatch(changeCurrentMessage(
                'Вы успешно зарегистрировались, введите данные для входа.'));
        }
        else dispatch(updateMessage('Пароли не совпадают!'));

    }
    else {
        message = nickFlag && !mailFlag ? 'Почта уже зарегистрирована другим пользователем!' :
            !nickFlag && mailFlag ? 'Ник уже зарегистрирован другим пользователем!' :
                'Почта и ник уже зарегистрированы!';
        dispatch(updateMessage(message));
    }
}

export const updateNick = (newNick) => ({ type: UPDATE_NICK, nick: newNick });
export const updateMail = (newMail) => ({ type: UPDATE_MAIL, mail: newMail });
export const updatePass = (newPass) => ({ type: UPDATE_PASS, pass: newPass });
export const updateSubmitPass = (submitPass) => ({ type: UPDATE_SUBMIT_PASS, submitPass: submitPass });
export const updateIsReg = (isReg) => ({ type: UPDATE_IS_REG, isReg: isReg });
export const updateMessage = (message) => ({ type: UPDATE_MESSAGE, message: message });
export const registration = () => ({ type: ADD_NEW_USER });

export default registrationReducer;