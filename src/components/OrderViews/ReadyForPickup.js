import React from "react";

import { updateOrderStatus } from "../../clientAPI/clientAPI";
import BackButton from "../AcceptDecline/Navbar";
import { Nav, Navbar, Card } from "react-bootstrap";

class ReadyForPickupView extends React.Component {
  handleSendOrder = status => {
    console.log("HEI", status);
    const orderNumber = this.props.order.order_number;
    updateOrderStatus(orderNumber, status);
  };

  render() {
    let orderList = this.props.order.order_list;

    const listedProducts = orderList.map(products => {
      return (
        <div key={products.productId}>
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
        <Navbar expand="lg">
          <BackButton />
          <div className="col-9"><strong>Kunde: {this.props.order.customer_name}</strong></div>
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
            onClick={() => this.handleSendOrder("delivered")}
            data-toggle="modal"
            data-target="#myModal"
            className="btn varner-btn-green w-100 mx-4 rounded-0 center"
          >
            Levert
          </button>
        </div>
        <div className="modal fade" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  ReservasjonsID: {this.props.order.reference_order_no}.
                </h5>
                <button type="button" className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h5>{this.props.order.customer_name} har mottatt varen.</h5>
                <br></br>
                Du finner nå orderen under utlevert.
              </div>
              <div className="modal-footer">
                <BackButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReadyForPickupView;
