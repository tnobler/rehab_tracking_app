import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Properties from "../components/Properties";
import Property from "../components/Property";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/properties" exact component={Properties} />
      <Route path="/property/:id" exact component={Property} />
    </Switch>
  </Router>
);
