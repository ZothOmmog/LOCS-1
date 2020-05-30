import React from 'react';
// import { UserProfileShort } from '../../../UserProfileShort/UserProfileShort';
// import { PagesNumbersMenu } from '../../../PagesNumbersMenu/PagesNumbersMenu';
import { UserList } from '../../UserList/UserList';
import { useState } from 'react';
import { useEffect } from 'react';

export const Subscribers = (props) => {
    const [users, setUsers] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([]);

    useEffect(function initialSetUsers() {
        const getSubscribers = async () => {
            alert('Тут запрос к серверу');

            setPages([1, 2]);

            setUsers([
                {friendStatus: 3, id: 46, nick: "John"}, 
                {friendStatus: 3, id: 47, nick: "Soe"},
                {friendStatus: 3, id: 48, nick: "Vlad"},
                {friendStatus: 3, id: 49, nick: "Alex"}
            ]);
        }
        
        getSubscribers();
    }, []); 
    
    useEffect(function setNewPageUsers() {
        const getNewPageUsers = async () => {
            alert('Тут получение новой страницы подписчиков с сервера');

            if(currentPage === '1') setUsers([
                {friendStatus: 3, id: 46, nick: "John"}, 
                {friendStatus: 3, id: 47, nick: "Soe"},
                {friendStatus: 3, id: 48, nick: "Vlad"},
                {friendStatus: 3, id: 49, nick: "Alex"}
            ]);

            if(currentPage === '2') setUsers([
                {friendStatus: 3, id: 66, nick: "Ivan"}, 
                {friendStatus: 3, id: 75, nick: "Petr"}
            ]);
        }

        getNewPageUsers();
    }, [currentPage]);

    const changeCurrentPage = (e) => {
        setCurrentPage(e.target.innerHTML);
    }

    return (
        <div>
            <UserList
                users={users}
                pages={pages}
                changeCurrentPage={changeCurrentPage}
                currentPage={currentPage}
            />
        </div>
    );
}