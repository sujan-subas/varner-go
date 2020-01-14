import React from "react";
import "./App.css";
import AcceptDecline from "./container/AcceptDecline";
// import HeaderContainer from "./container/HeaderContainer";
// import InfoContanier from "./container/InfoContainer";
// import Login from "./components/Login";
import OrderView from "./container/OrderView";
import ProductView from "./container/ProductView";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";

function App () {
	return (
		<HashRouter>
			<div className="App">
				<Switch>
					<Route path="/" exact component={OrderView} />
					{/* <Route path="/" exact component={Login} /> */}
					<Route path="/orders" exact component={OrderView} />
					<Route path="/orders/:ordernumber" component={ProductView} />
					<Route path="/orders/:ordernumber/processing:status" component={AcceptDecline} />
					<OrderView />
				</Switch>
			</div>
		</HashRouter>
	);
}

export default App;
