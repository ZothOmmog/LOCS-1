import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authThunks } from "~/redux/common-slices/auth-slice";

export const useAuthIfLoginSuccess = (isLogin) => {
    const [errorLogin, setErrorLogin] = useState('');
    const [tryLogin, setTryLogin] = useState(false);

    const dispatch = useDispatch();
    const fetchAuth = useCallback(() => dispatch(authThunks.fetchAuth()), [dispatch]);

    useEffect(() => {
        if (tryLogin) {
            if (isLogin) fetchAuth();
            else setErrorLogin('Неверный логин или пароль');
        }
    }, [isLogin, fetchAuth, tryLogin]);

    return { errorLogin, setTryLogin };
}