import React from "react";
import { Router as ReactRouter, Route, Switch } from "react-router-dom";
import MailPage from "../pages/MailPage";

import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const Router = () => (
  <ReactRouter history={history}>
    <Switch>
      <Route path="/mail" component={MailPage} />
    </Switch>
  </ReactRouter>
);

export default Router;