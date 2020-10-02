import React from 'react';
import style from './style.module.scss';
import { useSelector } from 'react-redux';
import { authSelectors } from '~/redux/common-slices/auth-slice';
import { ListCustom } from '~/ui/atoms';
import { TextWithLabel } from '~/ui/atoms/text-with-label';

export const ProfileOrganizerInfo = () => {
    const info = useSelector(authSelectors.infoSelector);
    const organizationLink = useSelector(authSelectors.organizationLinkSelector);
    const countSub = useSelector(authSelectors.countSubSelector);

    return (
        <div className="__profile-organizer-info">
            <TextWithLabel
                label='О нас'
                text={info}
            />
            <ListCustom
                headers={['Ссылка на организацию', 'Количество подписчиков']}
                disriptions={[organizationLink, countSub]}
                listClassName={style['__list']}
                itemClassName={style['__item']}
            />
        </div>
    );
}