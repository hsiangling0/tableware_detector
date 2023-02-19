import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import About from './pages/About';
import Identify from './Pages/identify';
import Home from './Pages/home';
import Activities from './Pages/activities';
import Account from './Pages/account';
// import NotFound from './pages/NotFound';

export default ({ childProps }) =>
  <Switch>
    <Route path="/" exact component={Home} props={childProps} />
    <Route path="/activities" exact component={Activities} props={childProps} />
    <Route path="/identify" exact component={Identify} props={childProps} />
    <Route path="/account" exact component={Account} props={childProps} />
    {/* <Route component={NotFound} /> */}
  </Switch>;