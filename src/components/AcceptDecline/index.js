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
      declined: null,
      reason: "",
      storeID: "a1",
      orderNumber: "",
      status: "new"
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleDeclinedReason = this.handleDeclinedReason.bind(this);
  }

  componentDidMount() {
    const { ordernumber } = this.props.match.params;
    console.log(`AcceptDeclineView did mount: ${ordernumber}`);
    this.updateState();
  }

  updateState() {
    const { status } = this.props.match.params;
    if (status === "declined") {
      this.setState({
        declined: true,
        status
      });
    } else if (status === "in-process") {
      this.setState({
        declined: false,
        status
      });
    }
  }
  //functions footer buttons
  async handleButtonClick(string, props) {
    console.log('ttttttttttttttttttttttttt')
    console.log("string,", string);
    if (string === "ok") {
      this.setState({
        comfirmed: !this.state.comfirmed
      });
      const { ordernumber } = this.props.match.params;
      try {
        await updateOrderStatus(ordernumber, 'in-process', 'Orderen er godkjent')
        
      }
      catch(err) {
        console.log(err)
      }
      props.history.goBack();
      

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
        this.props.history.goBack();
      }
      
    } else {
      alert("tilbake til oversikt");
    }
  }

  // functions button for decline reason
  async handleDeclinedReason(reason) {
    const { ordernumber } = this.props.match.params;
    // console.log('ordernumber', ordernumber)
    try {
      await updateOrderStatus(ordernumber, this.state.status, reason);
      this.setState({
        comfirmed: !this.state.comfirmed,
        reason
      });
    } catch (error) {
      console.log(`Was not able to delete order! Error: ${error.message}`);
      alert(`Was not able to delete order!`);
    }
    console.log(reason);
    this.props.history.push('/');
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
        <main className="varner-dark-theme container-fluid container">
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
