import React from "react";
import {
  Nav,
  NavDropdown,
  Navbar,
  Card,
  Tab,
  Tabs,
  NavbarBrand
} from "react-bootstrap";

import { Link } from "react-router-dom";
import { format } from "date-fns";

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

  handleChangeTab(tabKey) {
    this.setState({ tabKey });
  }

  render() {
    const { tabKey } = this.state;

    const orderElements = orderLine
      .filter(({ status, orderDate }) => status === tabKey)
      .map(order => {
        const formattedDate = format(new Date(order.orderDate), "MM/dd/yyyy");
        console.log(order);
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
      if (this.state.tabKey === "new") {
        newName = "Nye ordre";
      } else if (this.state.tabKey === "in-process") {
        newName = "Under behandling";
      } else if (this.state.tabKey === "packed") {
        newName = "Til henting";
      } else if (this.state.tabKey === "delivered") {
        newName = "Levert";
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
        {/* <Navbar bg="light" expand="lg">
          <NavbarBrand>{switchName()}</NavbarBrand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"> */}
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
          {/* <NavDropdown title="Fullført" id="nav-dropdown">
            <NavDropdown.Item eventKey="delivered">Levert</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey="rejected">Avvist</NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        {/* </Navbar.Collapse>
        </Navbar> */}
        <div>{orderElements}</div>
      </React.Fragment>
    );
  }
}

export default Overview;
