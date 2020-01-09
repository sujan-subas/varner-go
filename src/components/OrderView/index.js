import React from "react";
import { Card, Tab, Tabs } from "react-bootstrap";
import { parseJSON } from "date-fns";

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
    status: "processing"
  },
  {
    orderedQuantity: 3,
    name: "Inge Martinsen",
    referenceOrderNo: 6001344253,
    orderDate: "2019-12-17T11:26:47",
    status: "delivery"
  }
];

const parseDate = orderLine.map(order => {
  return parseJSON(order.date);
});

let date = parseDate;
console.log(date);

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
      .filter(({ status }) => status === tabKey)
      .map(orders => {
        return (
          <Card style={{ width: "30rem" }}>
            <Card.Header>Order id: {orders.referenceOrderNo}</Card.Header>
            <Card.Body>
              <Card.Title>Order quantity: {orders.orderedQuantity}</Card.Title>
              <Card.Text>Name: {orders.name}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
          </Card>
        );
      });

    return (
      <React.Fragment>
        <Tabs
          id="controlled-tab-example"
          activeKey={tabKey}
          onSelect={tabKey => this.handleChangeTab(tabKey)}
        >
          <Tab eventKey="new" title="Nye Ordre">
            <div>{orderElements}</div>
          </Tab>
          <Tab eventKey="processing" title="Under Behandling">
            <div>{orderElements}</div>
          </Tab>
          <Tab eventKey="delivery" title="Til Henting">
            <div>{orderElements}</div>
          </Tab>
        </Tabs>
      </React.Fragment>
    );
  }
}

export default Overview;
