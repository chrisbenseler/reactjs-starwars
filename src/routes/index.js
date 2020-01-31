import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../components/Home';
import Planets from '../components/Planets';
import Planet from '../components/Planet';
import Film from '../components/Film';
import People from '../components/People';

export default function Routes() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/index.html" exact component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/planets/:id" component={Planet} />
        <Route path="/planets" component={Planets} />
        <Route path="/films/:id" component={Film} />
        <Route path="/people/:id" component={People} />
      </Switch>
    );
  }