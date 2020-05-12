import React from 'react';
import { SearchContainer } from '../../indexComponents';
import s from './SearchUsers.module.scss';
import { NavLink } from 'react-router-dom';
import { PagesNumbersMenu } from '../../PagesNumbersMenu/PagesNumbersMenu';

export const SearchUsers = (props) => {
    return (
        <div className={s.SearchUsers}>
            <div className={s.SearchUsersTitleWrapper}>
                <div 
                    className={s.SearchUsersTitleWrapperBack}
                    onClick={props.onClickBackHandler}
                >
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
            <div>
                <SearchContainer
                    searchGo={props.searchUsersGo}
                    pageSize={props.countUsers}
                    currentPage={props.currentPage}
                />
            </div>
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