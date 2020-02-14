import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './views/Home';
import NotFound from './views/NotFound';
import UserProfile from './views/UserProfile';
import BattleMode from './views/BattleMode';
import TrainingMode from './views/TrainingMode';
import WaitingRoom from './views/WaitingRoom';
import Reward from './views/Reward';

// build the router
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/profile' component={UserProfile} />
        <Route exact path='/battle' component={BattleMode} />
        <Route exact path='/waiting' component={WaitingRoom} />
        <Route exact path='/training' component={TrainingMode} />
        <Route exact path='/reward' component={Reward} />
        <Route path='*' exact={true} component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

// export
export default Router;
