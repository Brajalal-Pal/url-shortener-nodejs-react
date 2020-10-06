import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import URLShortner from "./pages/URLShortner";
import Statistics from "./pages/Statistics";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={URLShortner} exact />
          <Route path="/stats" component={Statistics} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
