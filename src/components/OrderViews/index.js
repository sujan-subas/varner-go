import React from "react";
import { withRouter } from "react-router-dom";

import ProcessingOrderView from "./ProcessingOrderView";
import NewOrderView from "./NewOrderView";
import ReadyForPickupView from "./ReadyForPickup";

import { getOrderByOrderNumber } from "../../clientAPI/clientAPI";
import { getColor, getSize } from "../../utils/extractProductInfo";
import { getFormattedDate, getFormattedDeadLine } from "../../utils/getFormattedDeadLine";
import { getExpiryFromOrderDate } from "../../utils/getExpiryFromOrderDate";

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

  handleChangeView(statusValue) {
    this.setState({ status: statusValue })
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
        ActiveView = ReadyForPickupView;
    }

    return (
      <div>
        <ActiveView
          order={order}
          getColor={getColor}
          getSize={getSize}
          status={this.status}
          changeView={this.handleChangeView.bind(this)}
          getFormattedDate={getFormattedDate}
          handleClick={this.handleClick}
          now={this.state.now}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default withRouter(OrderViews);
