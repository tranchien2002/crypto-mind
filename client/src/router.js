import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './views/Home';
import NotFound from './views/NotFound';
import UserProfile from './views/UserProfile';
import BattleMode from './views/BattleMode';
import TrainingGame from './views/TrainingGame';
import BattleGame from './views/BattleGame';
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
        <Route exact path='/training' component={TrainingGame} />
        <Route exact path='/battleGame' component={BattleGame} />
        <Route exact path='/reward' component={Reward} />
        <Route path='*' exact={true} component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

// export
export default Router;
