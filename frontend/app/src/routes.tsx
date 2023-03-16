import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Details from './pages/Details';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/home' component={Home} />
        <Route path='/details' component={Details} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;