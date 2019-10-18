import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/main";
import Beatmap from "./pages/beatmaps";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/beatmap/:id" component={Beatmap} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
