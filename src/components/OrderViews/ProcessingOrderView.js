import React from "react";

import { withRouter } from "react-router-dom";
import { getFormattedDeadLine } from "../../utils/getFormattedDeadLine";
import { getSize, getColor } from "../../utils/extractProductInfo";
import { updateOrderStatus } from "../../clientAPI/clientAPI";

class ProcessingOrderView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pickedSkus: [],
      isLoading: false,
      error: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(sku) {
    if (this.state.pickedSkus.includes(sku)) {
      let i = this.state.pickedSkus.indexOf(sku);
      let pickedSkusCopy = [...this.state.pickedSkus];
      pickedSkusCopy.splice(i, 1);
      this.setState({
        pickedSkus: pickedSkusCopy
      });
    } else {
      this.setState({
        pickedSkus: [...this.state.pickedSkus, sku]
      });
    }
  }

  async handleChange(statusValue, event) {
    const { changeView, status } = this.props;
    const { order_number } = this.props.order;

    try {
      await updateOrderStatus(order_number, "packed");
    } catch (err) {
      console.log(err);
    }
    if (statusValue === "new") {
      changeView(status);
    }
  }

  render() {
    const { pickedSkus } = this.state;
    const { order, now } = this.props;
    let orderElements;

    const formattedDeadLine = getFormattedDeadLine(
      now,
      new Date(order.status_changed_at)
    );

    const header = (
      <header className="p-3">
        <div className="row">
          <div className="col-2">
            <button className="btn" onClick={() => this.props.history.goBack()}>
              <i
                className="fa fa-arrow-left text-success ml-auto"
                style={{ transform: "scale(1.5, 1)" }}
              />
            </button>
          </div>
          <div className="col-9">
            <strong>Ventet: </strong><strong className="green">{formattedDeadLine}</strong>
            <br />
            <strong>Antall varer: {order.order_list.length} </strong>
            <br />
            <strong>Varer plukket: </strong>
            <strong className="green">{pickedSkus.length} </strong>
            <strong>av {order.order_list.length}</strong>
          </div>
        </div>
      </header>
    );

    if (order && order.order_list) {
      orderElements = order.order_list.map(
        ({ description, orderQuantity, productId }) => {
          return (
            <div
              className="card text-white order-cards mb-4 p-4"
              key={productId}
            >
              <div className="row">
                <div className="col-6">
                  <img
                    src={
                      "https://cubus.imgix.net/globalassets/productimages/7239779_308_f_q_l_ina_hoodie_cubus.jpg?auto=format&w=1000"
                    }
                    alt="productImage"
                    className="img-fluid p-4"
                  />
                </div>
                <div className="col-6">
                  <div className="container p-4">
                    <h4>{description}</h4>
                    <br />
                    <p>Str: {getSize(description)}</p>
                    <p>Farge: {getColor(description)}</p>
                    <p>Antall: {orderQuantity}</p>
                    <p>SKU: {productId}</p>
                  </div>
                </div>
                <div className="col-12 m-4 text-center">
                  <button
                    className="btn btn-lg varner-btn-green w-75 mx-2 rounded-0"
                    onClick={this.handleClick.bind(this, productId)}
                  >
                    {this.state.pickedSkus.includes(productId)
                      ? "Plukket"
                      : "Marker som plukket"}
                  </button>
                </div>
              </div>
            </div>
          );
        }
      );

      return (
        <React.Fragment>
          {header}
          <div className="jumbotron jumbotron-fluid p-2 varner-white-theme" />
          <div className="container">
          <h3 className="text-center m-4">Ordreoversikt</h3>
            <div className="row">
              <div className="container">{orderElements}</div>
            </div>
            <div className="container m-4 text-center">
              <div className="row">
                <div className="col-6">
                  <button
                    onClick={this.handleChange.bind(this, "new")}
                    className="btn varner-btn-green w-75 mx-2 rounded-0"
                  >
                    Angre
                  </button>
                </div>
                <div className="col-6">
                  <button
                    disabled={pickedSkus.length !== order.order_list.length}
                    value={"packed"}
                    onClick={this.handleChange.bind(this, "packed")}
                    className="btn varner-btn-green w-75 mx-2 rounded-0"
                  >
                    Klar til opphenting
                  </button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    return <React.Fragment />;
  }
}

export default withRouter(ProcessingOrderView);
