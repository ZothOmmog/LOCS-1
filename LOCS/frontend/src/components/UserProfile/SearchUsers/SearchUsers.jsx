import React from 'react';
import { SearchContainer } from '../../indexComponents';
import s from './SearchUsers.module.scss';
import { NavLink } from 'react-router-dom';

export const SearchUsers = (props) => {
    return (
        <div className={s.SearchUsers}>
            <div className={s.SearchUsersTitleWrapper}>
                <div className={s.SearchUsersTitleWrapperBack}>
                    <NavLink 
                        className={s.SearchUsersTitleWrapperBack__Link} 
                        to='/userProfile/me'
                    >
                        Назад
                    </NavLink>
                </div>
                <h2 className={s.SearchUsersTitleWrapper__Title}>
                    Поиск пользователей по нику
                </h2>
            </div>
            <SearchContainer 
                searchGo={props.searchUsersGo}
                pageSize={props.countUsers}
                currentPage={props.currentPage}
            />
            <div className={s.SearchUsers__result}>{props.users}</div>
        </div>
    );
}