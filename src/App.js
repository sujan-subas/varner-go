import React from "react";
import "./App.css";
import AcceptOrder from "./components/ProductView/AcceptedOrder";
import HeaderContainer from "./container/HeaderContainer";
import InfoContanier from "./container/InfoContainer";
import OrderView from "./container/OrderView";
import ProductView from "./container/ProductView";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <AcceptOrder />
        <OrderView />
      </React.Fragment>
    </div>
  );
}

export default App;
