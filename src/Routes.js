import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Identify from './Pages/identify';
import Trade from './Pages/trade';
import Home from './Pages/home';
import Activities from './Pages/activities';
import Account from './Pages/account';
import Apply from './Pages/apply';
import Place from './Pages/place';

export default ({ childProps }) =>
  <Router>
    <Switch>
    <Route path="/" exact component={Home} props={childProps} />
    <Route path="/activities" exact component={Activities} props={childProps} />
    <Route path="/identify/:id" exact component={Identify} props={childProps} />
    <Route path="/trade" exact component={Trade} props={childProps} />
    <Route path="/account" exact component={Account} props={childProps} />
    <Route path="/apply/:id" exact component={Apply} props={childProps} />
    <Route path="/place/:id/:placeName/:price" exact component={Place} props={childProps} />
    </Switch>
  </Router>
  ;