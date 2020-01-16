import React from "react";
import { Nav, Navbar, Form, FormControl, Badge } from "react-bootstrap";
import { getAllOrdersDB } from "../../clientAPI/clientAPI";
import NoOrdersInDB from "./NoOrdersInDB";
import { getFormattedDate } from "../../utils/getFormattedDeadLine";

class MainView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  render() {
    let filteredOrders = this.state.allOrders;
    if (!this.state.allOrders.length) return <NoOrdersInDB />;

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
    const ordersFromDatabase = filteredOrders
      .filter(order => order.order_status === tabKey)
      .filter(
        order =>
          order.reference_order_no.toLowerCase().indexOf(this.state.search) !==
            -1 ||
          order.order_number.toLowerCase().indexOf(this.state.search) !== -1
      )
      .map((order, i) => {
        const formattedDate = getFormattedDate(order.order_date);
        return (
          <div
            className="text-white card order-cards m-4 "
            key={i}
            onClick={this.handleCardClick.bind(this, order.order_number)}
          >
            <div className="card-header">
              Ordre nummer: {order.order_number}
            </div>
            <div className="card-body ">
              {/* <p>Utløper om: {order.expire === 0 ? "Unable to state" : order.expire} 88 min</p> */}
              <p>Antall varer: {order.order_list.length}</p>
              <p>Bestillingstidspunkt: {formattedDate} </p>
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
        <Navbar className="bg-light shadow bg-light pb-0 " expand="lg">
          <div className="row p-2 m-0 w-100">
            <div className="col-3 mt-2">
              <strong>VarnerGo</strong>
            </div>
            <div className="col-7 px-0">
              <Form inline>
                <FormControl
                  type="text"
                  value={this.state.search}
                  onChange={this.updateSearch.bind(this)}
                  placeholder=" Søk på navn / tlf "
                />
              </Form>
            </div>
            <div className="col-2 p-0 m-auto">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </div>
          </div>
          <Navbar.Collapse id="basic-navbar-nav" className="border-top mt-2">
            <Nav
              className=""
              variant="pill"
              activeKey={tabKey}
              onSelect={tabKey => this.handleChangeTab(tabKey)}
            >
              <div className="row">
                <div className="col-6 text-center pb-0">
                  <Nav.Link eventKey="delivered">
                    <div className="m-2">
                      Utlevert{" "}
                      <Badge variant="success">
                        {statusCountDelivered.length}
                      </Badge>
                    </div>
                  </Nav.Link>
                </div>
                <div className="col-6 text-center pb-0">
                  <Nav.Link eventKey="declined">
                    <div className="m-2">
                      Avvist{" "}
                      <Badge variant="danger">
                        {statusCountDeclined.length}
                      </Badge>
                    </div>
                  </Nav.Link>
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Nav
          className="shadow color-nav "
          variant="tabs"
          defaultActiveKey="new"
          activeKey={tabKey}
          onSelect={tabKey => this.handleChangeTab(tabKey)}
        >
          <div className="row m-0 pb-0 text-center w-100">
            <div className="col-4 p-0">
              <Nav.Link eventKey="new">
                Nye ordre <br />
                <Badge variant="success">{statusCountNew.length}</Badge>
              </Nav.Link>
            </div>
            <div className="col-4 p-0">
              <Nav.Link eventKey="in-process">
                Skal pakkes <br />
                <Badge variant="success">{statusCountInProcess.length}</Badge>
              </Nav.Link>
            </div>
            <div className="col-4 p-0">
              <Nav.Link eventKey="packed">
                Til henting <br />
                <Badge variant="success">{statusCountPacked.length}</Badge>
              </Nav.Link>
            </div>
          </div>
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

export default MainView;
