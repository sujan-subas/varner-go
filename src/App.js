import React from "react";
import "./App.css";

//import Login from "./components/Login";

import OverView from "./components/OverView";

import ProcessingOrderView from "./components/ProcessingOrderView/ProcessingOrderView";
import AcceptDecline from "./components/AcceptDecline";
// import Testing from "./components/ProductView";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={OverView} />
          {/* <Route path="/" exact component={Login} /> */}
          <Route exact path="/orders" component={OverView} />
          <Route exact path="/orders/:ordernumber" component={ProcessingOrderView} />
          <Route
            path="/orders/:ordernumber/:status"
            component={AcceptDecline}
          />
          {/* <Route path="/orders/:ordernumber/processing" component={Testing} /> */}
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
