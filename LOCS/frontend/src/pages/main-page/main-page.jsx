import React from 'react';
import { connect } from 'react-redux';
import { NavLinkMap } from '~/ui';
import { eventProfileMockImg } from '~/assets';
import { HeaderDefault } from '~/features/header-default';
import { SelectedTagsList } from '~/features/selected-tags-list';
import { MainTemplate } from '~/templates';
import { EventListMain } from '~/features/event-list-main';

const MainPageView = () => {
    const eventListData = [];

    return (
        <MainTemplate   >
            <HeaderDefault />
            <SelectedTagsList />
            <EventListMain />
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