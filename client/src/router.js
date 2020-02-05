import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import NotFound from './views/NotFound';

// build the router
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='*' exact={true} component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

// export
export default Router;
