import React from "react";

import { updateOrderStatus } from "../../clientAPI/clientAPI";
import BackButton from "../Navbar/Navbar";
// import Navbar1 from "../Navbar/Navbar";
import { Nav, Navbar, Card } from "react-bootstrap";

class ReadyForPickupView extends React.Component {
  handleSendOrder = status => {
    console.log("HEI", status);
    const orderNumber = this.props.order.order_number;
    updateOrderStatus(orderNumber, status);
  };

  render() {
    let orderList = this.props.order.order_list;
    console.log(orderList);

    const listedProducts = orderList.map(products => {
      return (
        <div>
          <Card bg="dark" text="white">
            <Card.Header>Artikkel: {products.description}</Card.Header>
            <Card.Body>
              <Card.Text>
                Artikkelid: {products.productId}
                <br />
                Pris: {products.price} NOK
                <br />
                Antall: {products.orderQuantity}
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
        </div>
      );
    });

    return (
      <div>
        <Navbar bg="light" expand="lg">
          <BackButton />
          <Nav.Link className="justify-content-center">
            Henting ({this.props.order.customer_name}){" "}
          </Nav.Link>
        </Navbar>
        <div className="row varner-white-theme">
          <div className="container">
            <div className="col-sm-12 ">
              <h4>Sammendrag av bestilling</h4>
              <p>ReservasjonsID: {this.props.order.reference_order_no}</p>
              <p>Kunde: {this.props.order.customer_name}</p>
              <p>Telefon: {this.props.order.customer_phonenumber}</p>
            </div>
            <div className="col-sm-12 d-none d-lg-block">
              <p>Email: {this.props.order.customer_email}</p>
              <p>Leveringsadresse: {this.props.order.customer_addressline1}</p>
            </div>
          </div>
        </div>
        <div>
          <h4>Ordreoversikt</h4>
          {listedProducts}
        </div>
        <br />
        <div className="col-6 justify-content-center">
          <button
            // value={"packed"}
            onClick={() => this.handleSendOrder("delivered")}
            className="btn varner-btn-green w-100 mx-4 rounded-0 center"
          >
            Levert
          </button>
        </div>
      </div>
    );
  }
}

export default ReadyForPickupView;
