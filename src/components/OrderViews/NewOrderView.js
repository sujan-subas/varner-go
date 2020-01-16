import React from "react";
import {
  getFormattedDate,
  getFormattedDeadLine
} from "../../utils/getFormattedDeadLine";
import { getExpiryFromOrderDate } from "../../utils/getExpiryFromOrderDate";

const NewOrderView = props => {
  const { order, now } = props;

  const formattedDeadLine = getFormattedDeadLine(
    new Date(getExpiryFromOrderDate(order.created_in_app_at)),
    now
  );

  return (
    <>
      <header className="p-3">
        <div className="row">
          <div className="col-2">
            <button className="btn" onClick={() => props.history.goBack()}>
              <i
                className="fa fa-arrow-left text-success ml-auto"
                style={{ transform: "scale(1.5, 1)" }}
              />
            </button>
          </div>
          <div className="col-10">
            <strong>Utløper om: {formattedDeadLine}</strong>
            <br />
            <strong> Antall varer: {props.order.order_list.length} </strong>
          </div>
        </div>
      </header>
      <main>
        <div className="row varner-white-theme">
          <div className="container p-2 px-4">
            <div className="col-sm-12">
              <h5>Sammendrag av bestilling</h5>
              <strong>
                Bestillingsdato: {getFormattedDate(props.order.order_date)}
              </strong>
              <strong>ReservasjonsID: {props.order.reference_order_no}</strong>
              <strong>Kunde: {props.order.customer_name}</strong>
              <strong>Telefon: {props.order.customer_phonenumber}</strong>
            </div>
            <div className="col-sm-12 d-none d-lg-block">
              <strong>Email: {props.order.customer_email}</strong>
              <strong>
                Leveringsadresse: {props.order.customer_addressline1}
              </strong>
            </div>
          </div>
        </div>
        <div className="container">
          <h3 className="text-center m-4">Ordreoversikt</h3>
          <div className="container">
            {props.order.order_list.map(
              ({ description, orderQuantity, productId }) => {
                return (
                  <div className="col-xs-12 col-sm-6" >
                    <div
                      className="card order-cards mb-4 p-4"
                      key={order.reference_order_no}
                    >
                      <div className="row">
                        <div className="col-sm-12">
                          <h6>{props.getProductDescription(description)}</h6>
                          <p>
                            Str: {props.getSize(description)}
                            <br />
                            Farge: {props.getColor(description)}
                            <br />
                            Antall: {orderQuantity} <br />
                            SKU: {productId}
                          </p>
                        </div>
                        <div className="col-sm-10 col-md-6">
                          <div className="product-image">
                            <img
                              src={
                                "https://cubus.imgix.net/globalassets/productimages/7239779_308_f_q_l_ina_hoodie_cubus.jpg?auto=format&w=1000"
                              }
                              alt="productImage"
                              className="img-fluid"
                            />{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="text-center m-4 ">
          <div className="row">
            <button
              onClick={props.handleChange.bind(this, "in-process")}
              className="btn varner-btn-green m-4 col-10 rounded-0"
            >
              Godta Ordre
            </button>
          </div>
          <div className="row">
            <button
              onClick={props.handleChange.bind(this, "declined")}
              className="btn m-4 btn-danger col-10 rounded-0"
            >
              Avvis Ordre
            </button>
          </div>
        </div>
      </main>
    </>
  );
};
export default NewOrderView;
