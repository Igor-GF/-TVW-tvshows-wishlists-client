import './App.css';
import 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Auth/Signup';
import TvShowDetails from './components/TvShows/TvShowDetails';
import Login from './pages/Auth/Login';
import CreateList from './pages/CreateList';
import Wishlist from './pages/Wishlist';
import AuthService from './services/AuthService';
import Navbar from './components/Navbar/Navbar';

function App() {

  const [userState, setUserState] = useState(false);

  const userIsLoggedIn = () => {

    const service = new AuthService();

    service
      .loggedin()
      .then((resUserLogged) => {
        resUserLogged && setUserState(true);
      })
      .catch(err => console.error(err));
  }

  useEffect(userIsLoggedIn, [userState]);

  return (
    <div className="App">
      <Navbar userState={userState} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/create-list" component={CreateList} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/show-details/:showId" component={TvShowDetails} />
        <Route path="/wishlists/:listId" component={Wishlist} />
      </Switch>
    </div>
  );
}

export default App;