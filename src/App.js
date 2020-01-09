import React from "react";
//import HeaderContainer from './container/HeaderContainer';
//import InfoContanier from './container/InfoContainer';
//import OrderView from './container/OrderView';
import ProductView from "./container/ProductView";
import "./App.css";
import AcceptOrder from "./components/ProductView/AcceptedOrder";

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <AcceptOrder />
      </React.Fragment>
    </div>
  );
}

export default App;
