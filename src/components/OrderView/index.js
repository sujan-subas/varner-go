import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { format } from "date-fns";
import { getAllOrdersDB } from "../../clientAPI/clientAPI";

// const orderLine = [
//   {
//     orderedQuantity: 1,
//     name: "Tore Stensrud",
//     referenceOrderNo: 4001344251,
//     orderDate: "2019-12-16T11:26:41",
//     status: "new"
//   },
//   {
//     orderedQuantity: 5,
//     name: "Marting Stensrud",
//     referenceOrderNo: 4001341234,
//     orderDate: "2019-12-16T11:26:41",
//     status: "new"
//   },
//   {
//     orderedQuantity: 4,
//     name: "Hiruth Stautland",
//     referenceOrderNo: 4001345432,
//     orderDate: "2019-12-16T11:26:41",
//     status: "new"
//   },
//   {
//     orderedQuantity: 2,
//     name: "Magnus Sagerup",
//     referenceOrderNo: 5001344252,
//     orderDate: "2019-12-21T11:26:42",
//     status: "in-process"
//   },
//   {
//     orderedQuantity: 3,
//     name: "Inge Martinsen",
//     referenceOrderNo: 6001344253,
//     orderDate: "2019-12-17T11:26:47",
//     status: "packed"
//   },
//   {
//     orderedQuantity: 2,
//     name: "Aske Plaske",
//     referenceOrderNo: 5001344252,
//     orderDate: "2019-12-22T17:26:42",
//     status: "delivered"
//   },
//   {
//     orderedQuantity: 2,
//     name: "Frank Sank",
//     referenceOrderNo: 5001344252,
//     orderDate: "2019-12-24T16:26:42",
//     status: "rejected"
//   }
// ];

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // order: orderLine,
      tabKey: "new",
      error: false,
      allOrders: [],
      isLoading: true
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
  handleCardClick(orderNumber) {
    // function to get by id
    // const {history} = this.props
    // history.push(`/order`)
  }

  render() {
    if (!this.state.allOrders.length) return null;

    const { tabKey, allOrders } = this.state;
    console.log(allOrders);

    let switchName = () => {
      let newName = "";
      if (this.state.tabKey === "delivered") {
        newName = "Levert";
      } else if (this.state.tabKey === "rejected") {
        newName = "Avvist";
      }
      return newName;
    };

    const ordersFromDatabase = allOrders.map((order, i) => {
      const formattedDate = format(
        new Date(order.created_in_ap_at),
        "MM/dd/yyyy"
      );

      return (
        <div
          className="text-white card product-cards m-4"
          key={i}
          //   onClick={this.handleCardClick.bind(this, order.order_number)}
        >
          <div className="card-header">Ordre nummer: {order.order_number}</div>
          <div className="card-body ">
            <p>Utløper om: {order.expire}min</p>
            {/* <p>Antall varer:{order.order_list}</p> */}
            {/* <p>Bestillingsdato: {order.orderDate} </p> */}
            {/* <p>Bestillingsdato: {formattedDate} </p> */}
            <br />
            <p>Referanse Nummer: {order.reference_order_no}</p>
            <p>Name: {order.customer_name}</p>
          </div>
        </div>
        // <div
        //   className="card product-cards m-4"
        //   key={i}
        //   onClick={this.handleCardClick.bind(this, order.order_number)}
        // >
        //   {/* <div className="card product-cards" key={order.referenceOrderNo}> */}
        //   <div className="card-header ">Ordre nr : {order.order_number}</div>
        //   <div className="card-body ">
        //     <ul>
        //       <li>Utløper om: {order.expire}min</li>
        //       <li>Antall varer:{order.order_list}</li>
        //       <li>Bestillingsdato: {order.orderDate} </li>
        //       {/* <li>Bestillingsdato: {formattedDate} </li> */}
        //       <br />
        //       <li>Referanse Nummer: {order.reference_order_no}</li>
        //       <li>Name: {order.customer_name}</li>
        //     </ul>
        //   </div>
        // </div>
      );
    });
    console.log(typeof allOrders);

    const orderElements = orderLine
      .filter(order_status => order_status === tabKey)
      .map((order, i) => {
        return (
          <div
            className="card product-cards m-4"
            key={i}
            onClick={this.handleCardClick.bind(this, order.order_number)}
          >
            {/* <div className="card product-cards" key={order.referenceOrderNo}> */}
            <div className="card-header ">Ordre nr : {order.order_number}</div>
            <div className="card-body ">
              <ul>
                <li>Utløper om: {order.expire}min</li>
                <li>Antall varer:{order.order_list}</li>
                <li>Bestillingsdato: {order.orderDate} </li>
                {/* <li>Bestillingsdato: {formattedDate} </li> */}
                <br />
                <li>Referanse Nummer: {order.reference_order_no}</li>
                <li>Name: {order.customer_name}</li>
              </ul>
            </div>
          </div>
        );
      });
    console.log(ordersFromDatabase.length);
    return (
      <React.Fragment>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Varner Go</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="mr-auto"
              activeKey={tabKey}
              onSelect={tabKey => this.handleChangeTab(tabKey)}
            >
              <Nav.Link eventKey="delivered">Utlevert</Nav.Link>
              <Nav.Link eventKey="rejected">Avvist</Nav.Link>
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
          <Nav.Link eventKey="new"> Nye ordre </Nav.Link>
          <Nav.Link eventKey="in-process">Under behandling</Nav.Link>
          <Nav.Link eventKey="packed">Til henting</Nav.Link>
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
        <div className="container">{orderElements}</div>
      </React.Fragment>
    );
  }
}

export default Overview;
