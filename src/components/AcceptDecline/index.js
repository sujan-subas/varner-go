import React from "react";

import { updateOrderStatus } from "../../clientAPI/clientAPI";
import AcceptedView from "./AcceptedView";
import DeclinedView from "./DeclinedView";
import AcceptDeclineFooter from "./AcceptDeclineFooter";
import Navbar from "../Navbar/Navbar";

export default class AcceptDecline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comfirmed: false,
      declined: true,
      reason: "",
      storeID: "a45",
      orderNumber: "33",
      status: "new"
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleDeclinedReason = this.handleDeclinedReason.bind(this);
  }

  componentDidMount() {
    const { ordernumber } = this.props.match.params;
    console.log(`Accept did mouth: ${ordernumber}`);
    console.log(this.props.history.match);
    this.updateState();
  }

  updateState() {
    const { status } = this.props.match.params;
    console.log(this.props.match.params);
    if (status === "declined") {
      this.setState({
        declined: true
      });
    } else if (status === "in-process") {
      this.setState({
        confirmed: true
      });
    }
  }
  //functions button container
  handleButtonClick(string) {
    console.log("string,", string);
    if (string === "ok") {
      this.setState({
        comfirmed: !this.state.comfirmed
      });
    } else if (string === "declineOrder") {
      this.setState({
        comfirmed: !this.state.comfirmed
      });
    } else if (string === "back") {
      // legg til {histrpy}
      if (this.state.comfirmed === true) {
        this.setState({
          comfirmed: !this.state.comfirmed
        });
      }
      this.props.history.goBack()
    } else {
      // sender til pos
      //destructure state
      const { reason, storeID, orderNumber, status } = this.state;
      this.comfirmDelete(reason, storeID, orderNumber, status);
      alert("tilbake til oversikt");
    }
  }

  // functions button for decline reason
  async handleDeclinedReason(reason) {
    const { ordernumber } = this.props.match.params;
    try {
      if (reason === "other") {
        await updateOrderStatus(ordernumber, this.state.status);

        console.log(
          "other was the reason for declining the order, send to textfield to fill inn?"
        );
      } else {
        this.setState({
          comfirmed: !this.state.comfirmed,
          reason
        });
        const updateDBState = await updateOrderStatus(
          ordernumber,
          this.state.status,
          reason
        );
      }
    } catch (error) {
      console.log(`Was not able to delete order! Error: ${error.message}`);
      alert(`Was not able to delete order!`);
    }
    console.log(reason);
  }

  render() {
    const { comfirmed, declined, reason } = this.state;

    return (
      <div className="h-100 ">
        {/* Header */}
        <header className="p-3">
          <Navbar />
        </header>
        {/* GREY CONTAINER */}
        <main className="varner-black-theme container-fluid container">
          {declined ? (
            <DeclinedView
              handleDeclinedReason={this.handleDeclinedReason}
              comfirmed={comfirmed}
              reason={reason}
            />
          ) : (
            <AcceptedView handleButtonClick={this.handleButtonClick} />
          )}
          {/* END - grey container */}
        </main>
        {/* BUTTONS */}
        <footer>
          <AcceptDeclineFooter
            handleButtonClick={this.handleButtonClick}
            comfirmed={comfirmed}
          />
        </footer>
        {/* END - background */}
      </div>
    );
  }
}
