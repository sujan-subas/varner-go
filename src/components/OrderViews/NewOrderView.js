import React from "react";
import { withRouter } from "react-router-dom";
import { getFormattedDate, getFormattedDeadLine } from "../../utils/getFormattedDeadLine";
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
            <button
              className="btn"
              // onClick={() => props.handleButtonClick("back")}
            >
              <i
                className="fa fa-arrow-left text-success ml-4"
                style={{ transform: "scale(1.5, 1)" }}
              />
            </button>
          </div>
          <div className="col-9">
            <h4>Utløper om: {formattedDeadLine}</h4>
            {/* <h4> Antall varer: {props.order.order_list.length} </h4> */}
            {/* <h4> Kunde: {props.order.customer_name} </h4>
            <h4>Varer plukket: {props.pickedSkus.length}</h4> */}
          </div>
        </div>
      </header>
      <main className="">
        <div className="row varner-white-theme">
          <div className="container">
            <div className="col-sm-12 ">
              <h3>Sammendrag av bestilling</h3>
              <p>
                Bestillingsdato:{" "}
                {props.getFormattedDate(props.order.order_date)}
              </p>
              <p>ReservasjonsID: {props.order.reference_order_no}</p>
              <p>Kunde: {props.order.customer_name}</p>
              <p>Telefon: {props.order.customer_phonenumber}</p>
            </div>
            <div className="col-sm-12 d-none d-lg-block">
              <p>Email: {props.order.customer_email}</p>
              <p>Leveringsadresse: {props.order.customer_addressline1}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="container">
            <h3 className="text-center">Ordreoversikt</h3>
            <div className="container">
              <div className="varne-dark-theme">
                {props.order.order_list.map(
                  ({ description, orderQuantity, productId }) => {
                    return (
                      <div
                        className="card text-white order-cards mb-4 p-4"
                        key={productId}
                      >
                        <div className="row">
                          <div className="col-xs-12 col-6">
                            <div className="container p-4">
                              <strong>{description}</strong>
                              <br />
                              <p>Str: {props.getSize(description)}</p>
                              <p>Farge: {props.getColor(description)}</p>
                              <p>Antall: {orderQuantity}</p>
                              <p>SKU: {productId}</p>
                            </div>
                          </div>
                          <div className="col-xs-12 col-6">
                            <img
                              src={
                                "https://cubus.imgix.net/globalassets/productimages/7239779_308_f_q_l_ina_hoodie_cubus.jpg?auto=format&w=1000"
                              }
                              alt="productImage"
                              className="img-fluid p-4"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default NewOrderView;
