import React from "react";

import { updateOrderStatus } from "../../clientAPI/clientAPI";
import AcceptedView from "./AcceptedView";
import DeclinedView from "./DeclinedView";
import AcceptDeclineFooter from "./AcceptDeclineFooter";
import Navbar from "./Navbar";

export default class AcceptDecline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comfirmed: false,
      rejected: null,
      reason: "",
      storeID: "a1",
      orderNumber: "",
      status: "new"
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleDeclinedReason = this.handleDeclinedReason.bind(this);
  }

  componentDidMount() {
    this.updateState();
  }

  updateState() {
    const { status } = this.props.match.params;
    if (status === "rejected") {
      this.setState({
        rejected: true,
        status
      });
    } else if (status === "packed") {
      this.setState({
        rejected: false,
        status
      });
    }
  }
  //functions footer buttons
  async handleButtonClick(newStatus, props) {
    const { ordernumber } = this.props.match.params;
    console.log(this.history);
    if (newStatus === "packed") {
      try {
        await updateOrderStatus(ordernumber, newStatus, null);
        this.setState({
          comfirmed: !this.state.comfirmed,
          status: newStatus
        });
      } catch (err) {
        console.log(err);
      }
      this.props.history.push("/orders");
    } else if (newStatus === "rejected") {
      this.setState({
        comfirmed: !this.state.comfirmed,
        status: newStatus
      });
      await updateOrderStatus(ordernumber, newStatus, null);
    } else if (newStatus === "back") {
      if (this.state.comfirmed === true) {
        this.setState({
          comfirmed: !this.state.comfirmed
        });
        this.props.history.goBack();
      }
    }
  }

  // functions button for decline reason
  async handleDeclinedReason(reason) {
    const { ordernumber } = this.props.match.params;
    const status = this.state;
    try {
      this.setState({
        status: "rejected",
        comfirmed: !this.state.comfirmed,
        reason
      });
      await updateOrderStatus(ordernumber, status, reason);
    } catch (error) {
      console.log(`Was not able to delete order! Error: ${error.message}`);
      alert(`Was not able to delete order!`);
    }
    console.log(this.props);
    this.props.history.push("/");
  }

  render() {
    const { comfirmed, rejected, reason } = this.state;

    return (
      <div className="h-100 ">
        <header className="p-3">
          <Navbar />
        </header>
        <main className="varner-dark-theme container-fluid container">
          {rejected ? (
            <DeclinedView
              handleDeclinedReason={this.handleDeclinedReason}
              comfirmed={comfirmed}
              reason={reason}
            />
          ) : (
            <AcceptedView handleButtonClick={this.handleButtonClick} />
          )}
        </main>
        <footer>
          <AcceptDeclineFooter
            handleButtonClick={this.handleButtonClick}
            comfirmed={comfirmed}
          />
        </footer>
      </div>
    );
  }
}
