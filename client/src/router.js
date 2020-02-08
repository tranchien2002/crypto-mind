import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './views/Home';
import NotFound from './views/NotFound';
import UserProfile from './views/UserProfile';
import BattleMode from './views/BattleMode';
import TrainingMode from './views/TrainingMode';
import CreateGame from './views/CreateGame';

// build the router
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/profile' component={UserProfile} />
        <Route exact path='/battle' component={BattleMode} />
        <Route exact path='/create' component={CreateGame} />
        <Route exact path='/training' component={TrainingMode} />
        <Route path='*' exact={true} component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

// export
export default Router;
