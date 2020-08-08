import React from 'react';
import img from './MOCK_IMG.jpg';
import { MainTemplate } from './main-template';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from '~/ui/organisms';
import { EventProfileShort } from '~/ui/atoms/event-profile-short/event-profile-short';
import { NavLinkMap } from '~/ui/molecules/nav-link-map';
import { EventList } from '~/ui/molecules';
import { NavLinkCustom } from '~/ui/atoms';

export default {
  title: 'templates__MainTemplate',
  component: MainTemplate,
};



export const Main = () => {
    const eventListData = [];

    for(let i = 0; i < 12; i++) eventListData.push(
        <NavLinkCustom to='#' key={i}>
            <EventProfileShort date='Скоро' img={img} location='Где-то там' name='Крутая туса' />
        </NavLinkCustom>
    );
    
    return (
        <Router>
            <MainTemplate>
                <Header isAuth={false} path='/' />
                <div>
                    Тут будут отображаться фильтры
                    Тут будут отображаться фильтры
                    Тут будут отображаться фильтры
                    Тут будут отображаться фильтры
                </div>
                <EventList>
                    {eventListData}
                </EventList>
                <NavLinkMap to='/map' />
            </MainTemplate>
        </Router>
    );
};