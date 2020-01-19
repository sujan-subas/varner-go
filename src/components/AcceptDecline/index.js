import React from "react";

import { updateOrderStatus } from "../../clientAPI/clientAPI";
import AcceptedView from "./AcceptedView";
import RejectedView from "./RejectedView";
import AcceptDeclineFooter from "./AcceptDeclineFooter";
import BackButton from "./BackButton";

export default class AcceptDecline extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			comfirmed: false,
			rejected: null,
			reason: "",
			// storeID: "a1",
			// orderNumber: "",
			status: "new"
		};
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.handleRejectedReason = this.handleRejectedReason.bind(this);
	}

	componentDidMount () {
    const { ordernumber, status } = this.props.match.params;
    console.log(ordernumber, status)
		this.updateState(status);
	}

  updateState(status) {
    // const { status } = this.props.match.params;
    try {
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
    } catch(error) {
      console.log(`Error: ${error}`)
    }
  }
  //functions footer buttons
  async handleButtonClick(newStatus) {
    const { ordernumber } = this.props.match.params;

    if (newStatus === "packed") {
    try {
      await updateOrderStatus(
        ordernumber,
        newStatus,
        null
      );
      this.setState({
        comfirmed: !this.state.comfirmed,
        rejected: false,
        status: newStatus
      });
      this.props.history.push(`/orders/${ordernumber}`)
      } catch (err) {
        console.log(err);
      }

      
    } else if (newStatus === "new") {
      try {
        this.props.history.goBack();

      } catch(error) {
        console.log(`Error: ${error}`)
      }
    }
  }

	// functions button for decline reason
	async handleRejectedReason (reason) {
		const { ordernumber, status } = this.props.match.params;
		// console.log('ordernumber', ordernumber)
		try {
			await updateOrderStatus(ordernumber, status, reason);
			this.setState({
        comfirmed: !this.state.comfirmed,
        rejected: true,
        reason,
        status
			});
		} catch (error) {
			console.log(`Was not able to delete order! Error: ${error.message}`);
		}
		this.props.history.push("/");
	}

	render () {
		const { comfirmed, rejected, reason } = this.state;

    return (
      <>
        <header className="p-3">
          <div className="row">
            <div className="col-1 ">
              <BackButton />
            </div>
            <div className="col-11"></div>
          </div>
        </header>
        <main className="varner-dark-theme container">
          {rejected ? (
            <RejectedView
              handleRejectedReason={this.handleRejectedReason}
              comfirmed={comfirmed}
              reason={reason}
            />
          ) : (
            <AcceptedView handleButtonClick={this.handleButtonClick} />
          )}
          <AcceptDeclineFooter
            handleButtonClick={this.handleButtonClick}
            comfirmed={comfirmed}
          />
        </main>
      </>
    );
  }
}
