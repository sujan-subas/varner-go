import React from "react";
import { withRouter } from "react-router-dom";

import ProcessingOrderView from "./ProcessingOrderView";
import NewOrderView from "./NewOrderView";
import ReadyForPickupView from "./ReadyForPickup";

import { getOrderByOrderNumber } from "../../clientAPI/clientAPI";
import { getColor, getSize } from "../../utils/extractProductInfo";
import { getFormattedDate } from "../../utils/time";
class OrderViews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "",
      order: null
    };
  }

  componentDidMount() {
    this.getOrder();
  }

  async getOrder() {
    const { ordernumber } = this.props.match.params;
    try {
      this.setState({ isLoading: true });
      const order = await getOrderByOrderNumber(ordernumber);
      this.setState({ order });
      this.setStatus();
      this.setState({ isLoading: false });
    } catch (error) {
      this.setState({ error });
    }
  }

  setStatus() {
    const { order } = this.state;
    this.setState({
      status: order.order_status
    });
    console.log(this.state.status);
  }
  // handleClick(sku) {
  //   if (this.state.pickedSkus.includes(sku)) {
  //     let i = this.state.pickedSkus.indexOf(sku);
  //     let pickedSkusCopy = [...this.state.pickedSkus];
  //     pickedSkusCopy.splice(i, 1);
  //     this.setState({
  //       pickedSkus: pickedSkusCopy
  //     });
  //   } else {
  //     this.setState({
  //       pickedSkus: [...this.state.pickedSkus, sku]
  //     });
  //   }
  // }
  async handleChange(status, event) {
    const { ordernumber } = this.props.match.params;
    const { history } = this.props;
    history.push(`/orders/${ordernumber}/${status}`);
  }

  render() {
    const { status, order } = this.state;

    if (!order) {
      return <div>Loading order...</div>;
    }

    let ActiveView;

    switch (status) {
      case "new":
        ActiveView = NewOrderView;
        break;
      case "in-process":
        ActiveView = ProcessingOrderView;
        break;
      case "packed":
        ActiveView = ReadyForPickupView;
        break;
      default:
        ActiveView = NewOrderView;
    }

    return (
      <div>
        <ActiveView
          order={order}
          getColor={getColor}
          getSize={getSize}
          getFormattedDate={getFormattedDate}
          handleClick={this.handleClick}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default withRouter(OrderViews);
