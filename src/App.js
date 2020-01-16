import React from "react";
import "./App.css";

//import Login from "./components/Login";

import MainView from "./components/MainView";
import Footer from "./components/Footer/index";
import OrderViews from "./components/OrderViews";
import AcceptDecline from "./components/AcceptDecline";
// import Testing from "./components/ProductView";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: ''
    };
  }

  handleChangeView(statusValue) {
    this.setState({
      status: statusValue
    });
  }

  render () {
    return (
      <HashRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact component={MainView} />
            {/* <Route path="/" exact component={Login} /> */}
            <Route exact path="/orders" component={MainView} />
            <Route exact 
              path="/orders/:ordernumber" 
              component={OrderViews} state={this.state.status} 
              changeView={this.handleChangeView.bind(this)} />
            <Route 
              path="/orders/:ordernumber/:status" 
              component={AcceptDecline} 
              state={this.state.status} />
          </Switch>
          <Footer />
        </div>
      </HashRouter>
    );
  }
	
}

export default App;
