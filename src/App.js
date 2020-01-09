import React from "react";
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
        <OrderView />
      </React.Fragment>
    </div>
  );
}

export default App;
