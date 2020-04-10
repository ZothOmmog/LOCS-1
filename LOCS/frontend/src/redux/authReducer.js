import { userAPI } from "../api/api";

const SET_USER = 'SET_USER';
const UNSET_USER = 'UNSET_USER';
const CHANGE_CURRENT_MAIL = 'CHANGE_CURRENT_MAIL';
const CHANGE_CURRENT_PASS = 'CHANGE_CURRENT_PASS';

const initialState = {
    user: {
        id: null,
        mail: null,
        nick: null,
        city: null,
        urlPicture: null
    },
    isAuth: false,
    page: {
        currentMail: '',
        currentPass: ''
    }
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user,
                isAuth: true,
                page: { currentMail: '', currentPass: '' }
            };
        case UNSET_USER:
            return { ...state, user: { mail: null, nick: null, city: null, urlPicture: null }, isAuth: false }
        case CHANGE_CURRENT_MAIL:
            return { ...state, page: { ...state.page, currentMail: action.mail } };
        case CHANGE_CURRENT_PASS:
            return { ...state, page: { ...state.page, currentPass: action.pass } };
        default:
            return state;
    }
}

export const setUserThunk = (mail, pass) => async (dispatch) => {
    try {
        const login = await userAPI.login(mail, pass);

        if (login.Login.Flag) {
            const user = await userAPI.setMe();

            if (user.User.Auth) {
                const mail = user.User.Mail;
                const nick = user.User.Nick;
                const city = user.User.City;
                const urlPicture = user.User.UrlPicture;

                const userAdd = {
                    mail: mail,
                    nick: nick,
                    city: city,
                    urlPicture: urlPicture
                };

                dispatch(setUser(userAdd));
                alert('Вы успешно авторизированы!');
            }
            else alert('Ошибка сессии');
        }
        else alert('Неверно введены логин или пароль.');
    } catch(err) { console.log(err); }
}

export const setUser = (user) => {
    return { type: SET_USER, user: user };
}
export const unsetUres = () => {
    return { type: UNSET_USER };
}
export const changeCurrentMail = (newMail) => {
    return { type: CHANGE_CURRENT_MAIL, mail: newMail };
}
export const changeCurrentPass = (newPass) => {
    return { type: CHANGE_CURRENT_PASS, pass: newPass };
}

export default auth;