import React from "react";
import { Nav, Navbar, Card } from "react-bootstrap";
import { format } from "date-fns";
import { getAllOrdersDB } from "../../clientAPI/clientAPI";

const orderLine = [
  {
    orderedQuantity: 1,
    name: "Tore Stensrud",
    referenceOrderNo: 4001344251,
    orderDate: "2019-12-16T11:26:41",
    status: "new"
  },
  {
    orderedQuantity: 5,
    name: "Marting Stensrud",
    referenceOrderNo: 4001341234,
    orderDate: "2019-12-16T11:26:41",
    status: "new"
  },
  {
    orderedQuantity: 4,
    name: "Hiruth Stautland",
    referenceOrderNo: 4001345432,
    orderDate: "2019-12-16T11:26:41",
    status: "new"
  },
  {
    orderedQuantity: 2,
    name: "Magnus Sagerup",
    referenceOrderNo: 5001344252,
    orderDate: "2019-12-21T11:26:42",
    status: "in-process"
  },
  {
    orderedQuantity: 3,
    name: "Inge Martinsen",
    referenceOrderNo: 6001344253,
    orderDate: "2019-12-17T11:26:47",
    status: "packed"
  },
  {
    orderedQuantity: 2,
    name: "Aske Plaske",
    referenceOrderNo: 5001344252,
    orderDate: "2019-12-22T17:26:42",
    status: "delivered"
  },
  {
    orderedQuantity: 2,
    name: "Frank Sank",
    referenceOrderNo: 5001344252,
    orderDate: "2019-12-24T16:26:42",
    status: "rejected"
  }
];

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: orderLine,
      tabKey: "new"
    };
  }

  async componentDidMount() {
    const allOrders = getAllOrdersDB();
    console.log(allOrders);
  }

  handleChangeTab(tabKey) {
    this.setState({ tabKey });
  }

  render() {
    const { tabKey } = this.state;

    const orderElements = orderLine
      .filter(({ status }) => status === tabKey)
      .map(order => {
        const formattedDate = format(new Date(order.orderDate), "MM/dd/yyyy");
        return (
          <Card
            className="color-card"
            style={{ borderLeft: "1rem green solid" }}
            text="white"
            key={order.referenceOrderNo}
          >
            <Card.Header>Order id: {order.referenceOrderNo}</Card.Header>
            <Card.Body>
              <Card.Title>Order quantity: {order.orderedQuantity}</Card.Title>
              <Card.Text>
                Kunde: {order.name}
                <br></br>
                Bestillingsdato: {formattedDate}
              </Card.Text>
            </Card.Body>
          </Card>
        );
      });

    let switchName = () => {
      let newName = "";
      if (this.state.tabKey === "delivered") {
        newName = "Utlevert";
      } else if (this.state.tabKey === "rejected") {
        newName = "Avvist";
      }
      return newName;
    };
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
        {/* Navbar 2 */}
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
        <div>{orderElements}</div>
      </React.Fragment>
    );
  }
}

export default Overview;
