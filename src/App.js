import React from "react";
import "./App.css";

//import Login from "./components/Login";
import OrderView from "./components/OrderView";
import OverView from "./components/OverView";
import ProductView from "./components/ProductView";
import AcceptDecline from "./components/AcceptDecline";
import Testing from "./components/ProductView";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={OverView} />
          {/* <Route path="/" exact component={Login} /> */}
          <Route path="/orders" exact component={OverView} />
          <Route path="/orders/:ordernumber" component={ProductView} />
          <Route
            path="/orders/:ordernumber/processing:status"
            component={AcceptDecline}
          />
          {/* <Route path="/orders/:ordernumber/processing" component={Testing} /> */}
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
