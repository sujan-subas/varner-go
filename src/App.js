import React from "react";
import "./App.css";
// import AcceptOrder from "./components/ProductView/AcceptedOrder";
// import HeaderContainer from "./container/HeaderContainer";
// import InfoContanier from "./container/InfoContainer";
import Login from "./components/Login";
import OrderView from "./container/OrderView";
import AcceptedOrder from "./container/OrderView";
import ProductView from "./container/ProductView";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";

function App () {
	return (
		<HashRouter>
			<div className="App">
				<Switch>
					{/* <Route path="/" exact component={AcceptedOrder} /> */}
					{/* <Route path="/" exact component={Login} /> */}
					<Route path="/" exact component={OrderView} />
					<Route path="/orders/:ordernumber" component={ProductView} />
					<OrderView />
				</Switch>
			</div>
		</HashRouter>
	);
}

export default App;
