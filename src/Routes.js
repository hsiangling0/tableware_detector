import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import About from './pages/About';
import Identify from './Pages/identify';
import Trade from './Pages/trade';
import Home from './Pages/home';
import Activities from './Pages/activities';
import Account from './Pages/account';
// import NotFound from './pages/NotFound';

export default ({ childProps }) =>
  <Switch>
    <Route path="/tableware_detector/" exact component={Home} props={childProps} />
    <Route path="/tableware_detector/activities" exact component={Activities} props={childProps} />
    <Route path="/tableware_detector/identify" exact component={Identify} props={childProps} />
    <Route path="/tableware_detector/trade" exact component={Trade} props={childProps} />
    <Route path="/tableware_detector/account" exact component={Account} props={childProps} />
    {/* <Route component={NotFound} /> */}
  </Switch>;