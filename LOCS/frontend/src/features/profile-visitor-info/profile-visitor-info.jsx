import React from 'react';
import { useSelector } from 'react-redux';
import { authSelectors } from '~/redux/common-slices/auth-slice';
import { ListCustom } from '~/ui/atoms';

export const ProfileVisitorInfo = () => {
    const city = useSelector(authSelectors.visitorCitySelector);
    const email = useSelector(authSelectors.visitorMailSelector);

    return (
        <ListCustom
            headers={['Email', 'Город']}
            disriptions={[email, city || 'Неизвестно']}
        />
    );
}