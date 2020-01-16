import React from "react";

import ProcessingOrderView from "./ProcessingOrderView";
import NewOrderView from "./NewOrderView";
import ReadyForPickupView from "./ReadyForPickup";

import { getOrderByOrderNumber } from "../../clientAPI/clientAPI";
import {
  getColor,
  getSize,
  getProductDescription
} from "../../utils/extractProductInfo";
import { getFormattedDate } from "../../utils/getFormattedDeadLine";

class OrderViews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "",
      order: null,
      now: new Date()
    };

    this.timer = null;
  }

  componentDidMount() {
    this.getOrder();
    this.timer = setInterval(this.updateTime.bind(this), 1000 * 60);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateTime() {
    this.setState({
      now: new Date()
    });
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
  }

  handleChange = status => {
    console.log(this.props);
    const { ordernumber } = this.props.match.params;
    const { history } = this.props;
    history.push(`/orders/${ordernumber}/${status}`);
  };

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
        ActiveView = ReadyForPickupView;
    }

    return (
      <div>
        <ActiveView
          order={order}
          getColor={getColor}
          getSize={getSize}
          getProductDescription={getProductDescription}
          status={this.status}
          getFormattedDate={getFormattedDate}
          handleClick={this.handleClick}
          now={this.state.now}
          handleChange={this.handleChange}
          componentWillUnmount={this.componentWillUnmount.bind(this)}
        />
      </div>
    );
  }
}

export default OrderViews;
