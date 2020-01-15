import React from "react";
import {
  Nav,
  Navbar,
  Form,
  Button,
  FormControl,
  Badge,
  Tab,
  Tabs
} from "react-bootstrap";
import { format } from "date-fns";
import { getAllOrdersDB } from "../../clientAPI/clientAPI";
import { getFormattedDeadline } from "../../utils/time";

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // order: orderLine,
      tabKey: "new",
      error: false,
      allOrders: [],
      isLoading: true,
      search: "",
      searchResult: []
    };
  }

  async componentDidMount() {
    try {
      const allOrders = await getAllOrdersDB();
      this.setState({
        allOrders,
        isLoading: false
      });
    } catch (error) {
      console.log(`Error: ${error.message}`);
      this.setState({
        error
      });
    }
  }

  handleChangeTab(tabKey) {
    this.setState({ tabKey });
  }

  // search
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  handleCardClick(ordernumber) {
    const { history } = this.props;
    history.push(`/orders/${ordernumber}`);

    console.log(history);
    console.log(ordernumber);
  }

  render() {
    let filteredOrders = this.state.allOrders;
    if (!this.state.allOrders.length)
      return (
        <div className="container text-white">
          Ingenting å hente! Sjekk om server er oppe å går ;
        </div>
      );

    const { tabKey, allOrders } = this.state;

    let switchName = () => {
      let newName = "";
      if (this.state.tabKey === "delivered") {
        newName = "Levert";
      } else if (this.state.tabKey === "declined") {
        newName = "Avvist";
      }
      return newName;
    };
    //filtrer på navenet til tabben
    console.log("heeeeeeeeeei", filteredOrders);
    const ordersFromDatabase = filteredOrders
      .filter(order => order.order_status === tabKey)
      .filter(
        order =>
          order.reference_order_no.toLowerCase().indexOf(this.state.search) !==
            -1 ||
          order.order_number.toLowerCase().indexOf(this.state.search) !== -1
      )
      .map((order, i) => {
        //  fix formate data
        // const formattedDate = format(
        //   new Date(order.created_in_ap_at),
        //   "MM/dd/yyyy"
        // );
        return (
          <div
            className="text-white card order-cards m-4 "
            key={i}
            onClick={this.handleCardClick.bind(this, order.order_number)}
          >
            <div className="card-header">
              Ordre nummer: {order.order_number} | {order.order_status}
            </div>
            <div className="card-body ">
              <p>
                Utløper om:{" "}
                {order.expire === 0 ? "Unable to state" : order.expire} 88 min
              </p>
              <p>Antall varer: {order.order_list.length}</p>
              {/* <p>Bestillingsdato: {formattedDate} </p> */}
              <br />
              <p>Referanse Nummer: {order.reference_order_no}</p>
              <p>Name: {order.customer_name}</p>
            </div>
          </div>
        );
      });

    //return

    let statusCountNew = [];
    let statusCountInProcess = [];
    let statusCountPacked = [];
    let statusCountDelivered = [];
    let statusCountDeclined = [];
    allOrders.forEach(count => {
      let orderStatus = count.order_status;
      if (orderStatus === "new") {
        statusCountNew.push(orderStatus);
      } else if (orderStatus === "in-process") {
        statusCountInProcess.push(orderStatus);
      } else if (orderStatus === "packed") {
        statusCountPacked.push(orderStatus);
      } else if (orderStatus === "delivered") {
        statusCountDelivered.push(orderStatus);
      } else if (orderStatus === "declined") {
        statusCountDeclined.push(orderStatus);
      }
    });

    return (
      <React.Fragment>
        <Navbar bg="light" expand="lg">
          {/* <Navbar.Brand>Varner Go</Navbar.Brand> */}
          <Form inline>
            <FormControl
              type="text"
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
              placeholder="Search"
              className="mr-sm-2"
            />
          </Form>
          {/* <strong>
            {" "}
            Active orders <Badge variant="success">{allOrders.length}</Badge>
          </strong> */}
          {/* Active Orders ({allOrders.length}) */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="mr-auto"
              variant="pill"
              activeKey={tabKey}
              onSelect={tabKey => this.handleChangeTab(tabKey)}
            >
              <Nav.Link eventKey="delivered">
                Utlevert{" "}
                <Badge variant="success">{statusCountDelivered.length}</Badge>
                {/* Utlevert ({statusCountDelivered.length}){" "} */}
              </Nav.Link>
              <Nav.Link eventKey="declined">
                Avvist{" "}
                <Badge variant="danger">{statusCountDeclined.length}</Badge>
                {/* Avvist ({statusCountDeclined.length}){" "} */}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Nav
          className="justify-content-center color-nav"
          variant="tabs"
          defaultActiveKey="new"
          activeKey={tabKey}
          onSelect={tabKey => this.handleChangeTab(tabKey)}
        >
          <Nav.Link eventKey="new">
            Nye ordre <Badge variant="success">{statusCountNew.length}</Badge>
            {/* Nye ordre ({statusCountNew.length}){" "} */}
          </Nav.Link>
          <Nav.Link eventKey="in-process">
            Under behandling{" "}
            <Badge variant="success">{statusCountInProcess.length}</Badge>
            {/* Under behandling ({statusCountInProcess.length}){" "} */}
          </Nav.Link>
          <Nav.Link eventKey="packed">
            Til henting{" "}
            <Badge variant="success">{statusCountPacked.length}</Badge>
            {/* Til henting ({statusCountPacked.length}){" "} */}
          </Nav.Link>
        </Nav>
        <h2>{switchName()}</h2>
        {ordersFromDatabase.length === 0 ? (
          <div className="text-white">
            <div className="container">
              NO {tabKey.toLocaleUpperCase()} ORDERS
            </div>
          </div>
        ) : (
          ordersFromDatabase
        )}
      </React.Fragment>
    );
  }
}

export default Overview;
