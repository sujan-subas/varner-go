import React from "react";
import "./App.css";

import MainView from "./components/MainView";
import Footer from "./components/Footer/index";
import OrderViews from "./components/OrderViews";
import AcceptDecline from "./components/AcceptDecline";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";

function App () {
	return (
		<HashRouter>
			<div className="App">
				<Switch>
					<Route path="/" exact component={MainView} />
					<Route exact path="/orders" component={MainView} />
					<Route exact path="/orders/:ordernumber" component={OrderViews} />
					<Route path="/orders/:ordernumber/:status" component={AcceptDecline} />
				</Switch>
				<Footer />
			</div>
		</HashRouter>
	);
}

export default App;
