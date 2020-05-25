import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import Secret from './components/SecretPage';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <PrivateRoute path="/secret">
            <Secret />
          </PrivateRoute>
        </Switch>
      </> 
    )
  }
}
