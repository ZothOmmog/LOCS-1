import React from 'react';
import { Route } from 'react-router-dom';
import style from './App.module.scss';
import { 
  HeaderContainer, 
  Navbar, 
  SearchContainer, 
  LentaContainer, 
  AddEventContainer, 
  RegistrationContainer, 
  EventProfileContainer, 
  AuthContainer,
  UserProfileContainer
} from './components/indexComponents.js';


function App() {
  return (
    <div className={style.App}>
      <HeaderContainer />
      <Navbar />
      <SearchContainer />
      <Route
        path='/Lenta'
        render={() => <LentaContainer />}
      />
      <Route
        path='/AddEvent'
        render={() => <AddEventContainer />}
      />
      <Route
        path='/Registration'
        render={() => <RegistrationContainer />}
      />
      <Route
        path='/Auth'
        render={() => <AuthContainer />}
      />
      <Route
        path='/EventProfile/:eventId'
        render={() => <EventProfileContainer />}
      />
      <Route
        path='/UserProfile/:userId'
        render={() => <div className={style.AppUserProfileOutherWrapper}> <UserProfileContainer /> </div>}
      />
    </div>
  );
}

export default App;