import React from "react";
import {
  getFormattedDate,
  getFormattedDeadLine
} from "../../utils/getFormattedDeadLine";
import { getExpiryFromOrderDate } from "../../utils/getExpiryFromOrderDate";
import BackButton from "../BackButton"
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
              <BackButton />
          </div>
          <div className="col-10">
            <strong>Utløper om: </strong>
            <strong className="green">{formattedDeadLine}</strong>
            <br />
            <strong> Antall varer: {props.order.order_list.length} </strong>
          </div>
        </div>
      </header>
      <main>
        <div className="varner-white-theme">
          <div className="container">
            <div className="col-sm-12">
              <h5>Sammendrag av bestilling</h5>
              <strong>
                Bestillingsdato: {getFormattedDate(props.order.order_date)}
              </strong>
              <br />
              <strong>ReservasjonsID: {props.order.reference_order_no}</strong>
              <br />
              <strong>Kunde: {props.order.customer_name}</strong>
              <br />
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
        <div className="row">
          <div className="container">
          <h3 className="text-center m-3">Ordreoversikt</h3>
          </div>
          </div>
          <div className="row">
            <div className="container">
            {props.order.order_list.map(
              ({ description, orderQuantity, productId }) => {
                return (
                  <div className="col-xs-12 col-sm-6 mb-3" key={productId}>
                    <div
                      className="card order-cards p-2 rounded-0"                    >
                      <div className="row">
                        <div className="col-12">
                          <h6>{props.getProductDescription(description)}</h6>
                        </div>
                        <div className="col-6">
                          <div className="product-image w-100">
                            <img
                              src={
                                "https://cubus.imgix.net/globalassets/productimages/7239779_308_f_q_l_ina_hoodie_cubus.jpg?auto=format&w=1000"
                              }
                              alt="productImage"
                              className="img-fluid "
                            />
                          </div>
                        </div>
                        <div className="col-6 pt-3">
                          <article>
                            <b className="varner-text-grey mr-2">
                               Str: 
                            </b>
                             {props.getSize(description)}
                            <br />
                            <b className="varner-text-grey mr-2">
                               Farge:
                            </b>
                            {props.getColor(description)}
                            <br />
                            <b className="varner-text-grey mr-2">
                               Antall:
                            </b>
                             {orderQuantity} <br />
                            <b className="varner-text-grey mr-2">
                               Product Id:
                            </b>
                            {productId}
                          </article>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="row">
          <div className="container text-center">
              <button
                onClick={props.handleChange.bind(this, "packed")}
                className="btn varner-btn-green"
              >
                Godta Ordre
              </button>
              <button
                onClick={props.handleChange.bind(this, "rejected")}
                className="btn varner-btn-dark"
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
