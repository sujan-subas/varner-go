import React from "react";
import { withRouter } from "react-router-dom";

const NewOrderView = props => {
  console.log(props);
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
            {/* <h4>Utløper om: {props.order.expires_at}</h4> */}
            <h4> Antall varer: {props.order.order_list.length} </h4>
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
            <h3 className="text-center m-4">Ordreoversikt</h3>
            <div className="container">
              {props.order.order_list.map(
                ({ description, orderQuantity, productId }) => {
                  return (
                    <div className="card order-cards mb-4 p-4" key={productId}>
                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <h4>{description}</h4>
                          <p>
                            Str: {props.getSize(description)}
                            <br />
                            Farge: {props.getColor(description)}
                            <br />
                            Antall: {orderQuantity} <br />
                            SKU: {productId}
                          </p>
                        </div>
                        <div className="col-sm-12 col-md-6">
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
      </main>
      <footer className="text-center m-4">
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
            onClick={props.handleChange.bind(this, "in-process")}
            className="btn m-4 btn-danger col-10 rounded-0"
          >
            Avvis Ordre
          </button>
        </div>
      </footer>
    </>
  );
};
export default NewOrderView;
