import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { organizerApi } from '../../../api/indexApi';
import { UserList } from '../UserList/UserList';
import { OrganizerProfileShort } from '../../SearchOrganizers/OrganizerProfileShort/OrganizerProfileShort';
import { Button } from '../../Button-bem/Button';
import { PagesNumbersMenu } from '../../PagesNumbersMenu/PagesNumbersMenu';
import s from './Subscribes.module.scss';

export const Subscribes = (props) => {
    const [users, setUsers] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUnSubscribe, setIsUnSubscribe] = useState(false);

    useEffect(function SetSubscribes() {
        const SetSubscribesFromServer = async () => {
            const result = await organizerApi.getMeOrg();
            const organizersFromServer = await organizerApi.subscribes(4, currentPage, result.data.organizerdata.id_user);
            
            setUsers(organizersFromServer.data.map(organizer => ({
                friendStatus: 3,
                id: organizer.sublist.id_user,
                nick: organizer.sublist.organization_name
            })));
            
            const newPages = [];

            for(let i = 1; i <= Math.ceil(organizersFromServer.count / 4); i++) {
                newPages.push(i);
            }

            setPages(newPages);
        }

        SetSubscribesFromServer();
        setIsLoading(false);
        if(isUnSubscribe) setIsUnSubscribe(false);
    }, [currentPage, isUnSubscribe]);

    const changeCurrentPage = (e) => {
        setCurrentPage(e.target.innerHTML);
    }
    const unSubscribeHandle = (orgId) => async () => {
        await organizerApi.unSubscribe(orgId);
        setIsUnSubscribe(true);
    }

    return isLoading ? 'Загрузка...' : (
        <div>
            <SubscribesList
                users={users}
                pages={pages}
                changeCurrentPage={changeCurrentPage}
                currentPage={currentPage}
                unSubscribeHandle={unSubscribeHandle}
            />
        </div>
    );
}

const SubscribesList = (props) => {
    const users = props.users ? props.users.map(user => (
        <div key={user.id} className={s.UserList__item}>
            <div className={s.UserList__UserProfileShort}>
                <OrganizerProfileShort key={user.id} userId={user.id} nick={user.nick} />
            </div>
            
                <div className={s.UserList__AddFriendButtonContainer}>
                    <Button style={{
                        buttonText: 'Отписаться',
                        type: 'NotBorderRadius',
                        onClickHandler: props.unSubscribeHandle(user.id)
                    }}/>
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