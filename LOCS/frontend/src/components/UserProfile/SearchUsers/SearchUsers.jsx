import React from 'react';
import { SearchContainer } from '../../indexComponents';
import s from './SearchUsers.module.scss';
import { PagesNumbersMenu } from '../../PagesNumbersMenu/PagesNumbersMenu';

export const SearchUsers = (props) => {
    
    return (
        <div className={s.SearchUsers}>
            <div className={s.SearchUsersTitleWrapper}>
                <h2 className={s.SearchUsersTitleWrapper__Title}>
                    Поиск пользователей по нику
                </h2>
            </div>
            <SearchContainer
                searchGo={props.searchUsersGo}
                pageSize={props.countUsers}
                currentPage={props.currentPage}
            />
            <div className={s.SearchUsers__resultOutherWrapper}>
            <div className={s.SearchUsers__resultTitle}>{props.searchResultTitle}</div>
            {props.users ?
                <div className={s.SearchUsers__resultInnerWrapper}>
                    <div className={s.SearchUsers__result}>{props.users}</div>
                    <div className={s.SearchUsers__pagesMenu}>
                        <PagesNumbersMenu
                            pages={props.pages}
                            currentPage={props.currentPage}
                            changeCurrentPage={props.changeCurrentPage}
                        />
                    </div>
                </div> : ''
            }
            </div>

        </div>
    );
}