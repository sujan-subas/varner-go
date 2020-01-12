import React from "react";
import "./App.css";
// import AcceptOrder from "./components/ProductView/AcceptedOrder";
// import HeaderContainer from "./container/HeaderContainer";
// import InfoContanier from "./container/InfoContainer";
import OrderView from "./container/OrderView";
import ProductView from "./container/ProductView";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    /*
    <React.Fragment>
      <ProductView />
    </React.Fragment>
    */
    
    <HashRouter>
      <div className="App">
        <Switch>
          {/* <Route path="/" exact component={LoginPage}/> */}
          <Route path="/" exact component={OrderView} />
          <Route path="/order/:ordernumber" component={ProductView} />
          <OrderView />
        </Switch>
      </div>
    </HashRouter>
    
  );
}

export default App;
