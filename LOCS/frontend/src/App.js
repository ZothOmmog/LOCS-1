import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  HeaderContainer, 
  Navbar, 
  LentaContainer,
  RegistrationContainer, 
  EventProfileContainer, 
  AuthContainer,
  UserProfileContainer,
  SearchEventsContainer,
  SearchOrganizersContainer
} from './components/indexComponents.js';
import { setMeThunk } from './redux/authReducer.js' 
import style from './App.module.scss';

function App(props) {

  return (
    <div className={style.App}>
      <HeaderContainer />
      <Navbar />
      {/* <SearchContainer /> */}
      <Switch>
        <Route
          path='/SearchEvents'
          render={() => <SearchEventsContainer />}
        />
        <Route
          path='/SearchOrganizers'
          render={() => <SearchOrganizersContainer />}
        />
        <Route
          path='/Lenta'
          render={() => <LentaContainer />}
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
          render={(routeProps) => <div className={style.App__UserProfile}> <UserProfileContainer route={routeProps.match.params} /> </div>}
        />
        <Route
          path='/'
          render={() => <LentaContainer />}
        />
      </Switch>
    </div>
  );
}

class AppWithAuth extends React.Component {
  componentDidMount() {
    this.props.setMeThunk();
  }

  render() {
    return <App />;
  }
}

export default connect(null, { setMeThunk })(AppWithAuth);