import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from './user/pages/Users.component';
import NewPlace from './places/pages/NewPlace.component';
import UserPlaces from './places/pages/UserPlaces.component';
import UpdatePlace from './places/pages/UpdatePlace.component';
import MainNavigation from './shared/components/Navigation/MainNavigation.component'
const App = () => {
  return <Router>
    <MainNavigation />
    <main>
      <Switch>
        <Route path="/" exact ><Users /></Route>
        <Route path="/:userId/places" exact><UserPlaces /></Route>
        <Route path="/places/new" exact ><NewPlace /></Route>
        <Route path="/places/:placeId" exact><UpdatePlace/></Route>
        <Redirect to="/" />
      </Switch>
    </main>
  </Router>

}

export default App;
