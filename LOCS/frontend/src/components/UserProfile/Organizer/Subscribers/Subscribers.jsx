import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import s from './Subscribers.module.scss';
import { UserProfileShort } from '../../../UserProfileShort/UserProfileShort';
import { organizerApi } from '../../../../api/indexApi';
import { PagesNumbersMenu } from '../../../PagesNumbersMenu/PagesNumbersMenu';

export const Subscribers = (props) => {
    const [users, setUsers] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(function SetSubscribes() {
        const SetSubscribesFromServer = async () => {
            const result = await organizerApi.getMeOrg();
            const organizersFromServer = await organizerApi.subscribersPages(4, currentPage, result.data.organizerdata.id_user);
            setUsers(!organizersFromServer.data.length ? null : organizersFromServer.data.map(organizer => ({
                friendStatus: 3,
                id: organizer.subscribers.id_user,
                nick: organizer.subscribers.nickname
            })));
            
            const newPages = [];

            for(let i = 1; i <= Math.ceil(organizersFromServer.count / 4); i++) {
                newPages.push(i);
            }

            setPages(newPages);
        }

        SetSubscribesFromServer();
        setIsLoading(false);
    }, [currentPage]);

    const changeCurrentPage = (e) => {
        setCurrentPage(e.target.innerHTML);
    }

    return isLoading ? 'Загрузка...' : !users ? 'У вас пока что нет подписчиков :(' : (
        <div>
            <SubscribesList
                users={users}
                pages={pages}
                changeCurrentPage={changeCurrentPage}
                currentPage={currentPage}
            />
        </div>
    );
}

const SubscribesList = (props) => {
    const users = props.users ? props.users.map(user => (
        <div key={user.id} className={s.UserList__item}>
            <div className={s.UserList__UserProfileShort}>
                <UserProfileShort key={user.id} userId={user.id} nick={user.nick} />
            </div>
        </div>
    )) : '';

    return <div className={s.UserList}>
        <div className={s.UserList__Users}>
            {users}
        </div>
        <div className={s.UserList__PagesNumbersMenu}>
            {props.pages ?
                <PagesNumbersMenu
                    pages={props.pages}
                    changeCurrentPage={props.changeCurrentPage}
                    currentPage={props.currentPage}
                /> : ''
            }
        </div>
    </div>;
}