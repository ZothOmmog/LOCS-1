import React from 'react';
import { connect } from 'react-redux';
import { 
    NavLinkCustom, 
    EventProfileShort,
    MainTemplate,
    Header,
    EventList,
    NavLinkMap
} from '~/ui';
import { eventProfileMockImg } from '~/assets';
import { HeaderDefault } from '~/features/header-default';


const MainPageView = () => {
    const eventListData = [];

    for(let i = 0; i < 12; i++) eventListData.push(
        <NavLinkCustom to='#' key={i}>
            <EventProfileShort date='Скоро' img={eventProfileMockImg} location='Где-то там' name='Крутая туса' />
        </NavLinkCustom>
    );
    
    return (
        <MainTemplate>
            <HeaderDefault />
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
    );
};

const mapStateToProps = (state) => ({
    isAuth: false,
});

const mapDispatchToProps = (dispatch) => ({

});

export const MainPage = connect(mapStateToProps, mapDispatchToProps)(MainPageView);