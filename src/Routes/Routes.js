import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import Test from "../Pages/Test/Test";

function Routes() {
  return (
    <div>
      <div>
        <Switch>
          <Route path="/" exact component={HomePage} />
        </Switch>
      </div>
    </div>
  );
}

export default Routes;
