import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions, authSelectors } from "~/redux/common-slices/auth-slice";

/**
 * Хук для попапа логина, который принимает колбэк для установки флага появления попапа.
 * Колбэк вызывается после того, как пользователь успешно зарегистрировался.
 */
export const useOpenLoginWithSuccessReg = (setIsOpenPopup) => {
    if (
        typeof setIsOpenPopup !== 'function'
    ) throw new Error('В хук useOpenLoginWithSuccessReg передаются не все аргументы');

    const redirectToLoginAfterSuccessReg = useSelector(authSelectors.redirectToLoginAfterSuccessReg);
    const [messageForLogin, setMessageForLogin] = useState('');

    const dispatch = useDispatch();
    const SetRedirectToLoginToDefault = useCallback(
        () => dispatch(authActions.redirectToLoginAfterSuccessRegChanged(false)),
        [dispatch]
    );

    useEffect(() => {
        if (redirectToLoginAfterSuccessReg) {
            setIsOpenPopup(true);
            SetRedirectToLoginToDefault();
            setMessageForLogin('Вы успешно зарегистрировались!')
        }
    }, [redirectToLoginAfterSuccessReg, SetRedirectToLoginToDefault, setIsOpenPopup]);

    return messageForLogin;
}