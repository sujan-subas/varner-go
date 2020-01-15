import React from "react";
import { withRouter } from 'react-router-dom';

import ProcessingOrderView from "./ProcessingOrderViewblabla";
import NewOrderView from "./NewOrderView";
import ReadyForPickupView from "./ReadyForPickup";

import { getOrderByOrderNumber } from "../../clientAPI/clientAPI";

class OrderViews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "",
      order: {}
    }
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
    })
    console.log(this.state.status)
  }

  render() {
    const { status } = this.state;

    let ActiveView;

    switch (status) {
      case 'new':
        ActiveView = NewOrderView;
        break;
      case 'in-process':
        ActiveView = ProcessingOrderView;
        break;
      case 'packed':
        ActiveView = ReadyForPickupView;
        break;
      default:
        ActiveView = NewOrderView;
    };

    return (
      <div>
        <ActiveView />
      </div>
    )
  }
}

export default withRouter(OrderViews);