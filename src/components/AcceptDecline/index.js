import React from "react";
//lag som functional component som tar inn props istendfor å ha egen state,
//todo: legg til {history, når man går tilbake }
// handleButtonClick får ikke inn verdien.. (string), har ikke funnet løsning. 
// sende inn storeID , ordernumber og stats via props? 
// React router?
import {updateVarner} from '../../clientAPI/clientAPI'

export default class AcceptDecline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comfirmed: true,
      declined: false,
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
    console.log('string,' ,string)
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
    } else {
      // sender til pos
      //destructure state
      const {reason, storeID, orderNumber, status} = this.state
      this.comfirmDelete(reason, storeID, orderNumber, status);
      alert("tilbake til oversikt");
    }
  }

  // functions button for decline reason
  handleDeclinedReason(reason) {
    try {
      if (reason === "other") {
        console.log(
          "other was the reason for declining the order, send to textfield to fill inn?"
        );
      } else {
        this.setState({
          comfirmed: !this.state.comfirmed,
          reason
        });
      }
    } catch (error) {
      console.log(`Was not able to delete order! Error: ${error.message}`);
      alert(`Was not able to delete order!`);
    }
    console.log(reason)
  }
  // Function to handle accepted orders
  confirmHandleOrder() {
    console.log('accepeeeet')
  }

  // function to post delete request in data base and send order to sweed and api back to varner
  comfirmDelete(reason, storeID, orderNumber, status) {
    console.log(`comfirmDelete Pressed! send to database! Reason: ${reason} `);
  
    //send to varner api
    updateVarner(reason, storeID, orderNumber, status)

  }

  render() {
    const { comfirmed, declined } = this.state;

    return (
      // {/* background */}
      <div style={{ width: "100%", height: "100vh", color: "white" }}>
        {/* Header */}
        <header className="p-3">
          <button
            className="btn"
            onClick={() => this.handleButtonClick("back")}
          >
            <i
              className="fa fa-arrow-left text-success ml-4 "
              style={{ transform: "scale(1.5, 1)" }}
            />
          </button>
        </header>
        {/* GREY CONTAINER */}
        <main className="text-center">
          <div
            className="bg-secondary container-fluid py-4"
            style={{ height: "70vh" }}
          >
            {declined ? (
              <div className="row">
                {!comfirmed ? (
                  <div className="container">
                    <h2 className="text-white p-3">
                      Hvorfor vil du avvise ordren?
                    </h2>
                    <div className="container">
                      <button
                        className="btn w-75 m-3 p-3 bg-light rounded-0"
                        onClick={() =>
                          this.handleDeclinedReason("notAvailable")
                        }
                      >
                        Varen er ikke tillgjengelig
                      </button>
                      <button
                        className="btn w-75 m-3 p-3 bg-light rounded-0"
                        onClick={() => this.handleDeclinedReason("damage")}
                      >
                        Varen er skadet
                      </button>
                      <button
                        className="btn w-75 m-3 p-3 bg-light rounded-0"
                        onClick={() => this.handleDeclinedReason("noTime")}
                      >
                        Har ikke tid
                      </button>
                      <button
                        className="btn w-75 m-3 p-3 bg-light rounded-0"
                        onClick={() => this.handleDeclinedReason("other")}
                      >
                        Annet
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="container p-4">
                    <i
                      className="fa fa-times fa-10x text-success m-4"
                      style={{ fontSize: "8rem" }}
                    />
                    <div className="text-white m-3">
                      <strong className="w-50 display-4">
                        Ordren er avvis!
                      </strong>
                      <hr />
                      <h5>
                        Fordi: {this.state.reason}! <br /> Du finner den under
                        "avviste ordre"!
                      </h5>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              //   ACCEPTED VIEWS -----------------
              <div className="row mb-4">
                {!comfirmed ? (
                  <div className="container">
                    <i
                      className="fa fa-check fa-10x text-success text-center m-4"
                      style={{ fontSize: "8rem" }}
                    />
                    <div className="text-white container">
                      <p className="display-4">Orderen er akseptert!</p>
                      <strong className="w-50">
                        Obs!Notere at orderen ikke er ferdig behandlet før
                        varene er plukket og bekreftelse er sendt til kunde. Du
                        har fortsatt mulighet å avvise orderen.
                      </strong>
                    </div>
                  </div>
                ) : (
                  <div className="container">
                    <i
                      className="fa fa-exclamation fa-10x text-success text-center m-4"
                      style={{ fontSize: "8rem" }}
                    ></i>
                    <div className="text-white container">
                      <p className="display-4"></p>
                      <strong className="w-50">
                        HUSK ALLE varer må plukkes før bekreftelse kan sendes
                        til kunde
                      </strong>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* END - grey container */}
          </div>

          {/* BUTTONS */}
          <div className="my-5">
            {!declined ? (
              // ACCEPTED BUTTONS ----------------
              <>
                {!comfirmed ? (
                  <>
                    <button
                      className="btn btn-lg text-white p-3 mx-2 rounded-0 w-25 "
                      style={{
                        backgroundColor: "#000"
                      }}
                      onClick={() => this.handleButtonClick()}
                    >
                      Tilbake
                    </button>
                    <button
                      className="btn btn-lg text-white p-3 mx-2 rounded-0 w-25"
                      style={{
                        backgroundColor: "#000"
                      }}
                      onClick={() => this.handleButtonClick.bind("ok")}
                      // alternative onclick for accepted orders?
                      
                    >
                      OK
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-lg text-white rounded-0 w-75"
                    style={{
                      backgroundColor: "#000"
                    }}
                    onClick={() => this.handleButtonClick()}
                  >
                    OK
                  </button>
                )}
              </>
            ) : (
              // END - Accepted buttons
              // DECLINED BUTTONS ------------------------------
              <>
                {!comfirmed ? (
                  <button
                    className="btn btn-lg text-white p-3"
                    style={{
                      backgroundColor: "#000",
                      width: "80%",
                      borderRadius: "0"
                    }}
                    onClick={() => this.handleButtonClick("back")}
                  >
                    Tilbake
                  </button>
                ) : (
                  <>
                    <button
                      className="btn btn-lg text-white p-3 mx-2 rounded-0 bg-danger"
                      style={{
                        backgroundColor: "#000"
                      }}
                      onClick={() => this.handleButtonClick("back")}
                    >
                      Avbryt
                    </button>
                    <button
                      className="btn btn-lg text-white p-3 mx-2 rounded-0 bg-success"
                      style={{
                        backgroundColor: "#000"
                      }}
                      onClick={() => this.handleButtonClick()}
                    >
                      Send
                    </button>
                  </>
                )}
              </>
              // END - Declined buttons
            )}
          </div>
        </main>
        {/* END - background */}
      </div>
    );
  }
}
