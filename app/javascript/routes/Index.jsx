import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Properties from "../components/Properties";
import Property from "../components/Property";
import NewProperty from "../components/NewProperty";
import Units from "../components/Units";
import Unit from "../components/Unit";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/properties" exact component={Properties} />
      <Route path="/property/:id" exact component={Property} />
      <Route path="/property" exact component={NewProperty} />
      <Route path="/units" exact component={Units} />
      <Route path="/unit/:id" exact component={Unit} />
    </Switch>
  </Router>
);
