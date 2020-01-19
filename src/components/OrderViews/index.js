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
    try {
      this.setState({ 
        isLoading: true 
      });
      const { ordernumber } = this.props.match.params;

      const order = await getOrderByOrderNumber(ordernumber);
      console.log(order)
      this.setState({ 
        order,
      status: order.order_status,
isLoading: false
    });

    } catch (error) {
      this.setState({ error });
    }
  }

  handleChange = status => {
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
      case "packed":
        ActiveView = ProcessingOrderView;
        break;
      case "in-process":
        ActiveView = ReadyForPickupView;
        break;
      default:
        ActiveView = ReadyForPickupView;
    }

    return (
      <>
        <ActiveView
          order={order}
          getColor={getColor}
          getSize={getSize}
          getProductDescription={getProductDescription}
          status={this.status}
          getFormattedDate={getFormattedDate}
          now={this.state.now}
          handleChange={this.handleChange}
          componentWillUnmount={this.componentWillUnmount.bind(this)}
        />
      </>
    );
  }
}

export default OrderViews;
