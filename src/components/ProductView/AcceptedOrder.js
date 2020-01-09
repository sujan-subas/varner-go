import React from "react";

export default class AcceptOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      readyForDelivery: false,
      accepted: false
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
  handleButtonClick() {
    console.log("cicked");
    this.setState({
      accepted: !this.state.accepted
    });
  }

  render() {
    const { readyForDelivery, accepted } = this.state;
    return (
      <>
        <div
          className="container-fluid bg-dark"
          style={{ width: "100%", height: "100vh" }}
        >
          <div className="row p-4">
            <i className="fa fa-arrow-left text-light mx-2"></i>
          </div>
          <div className="row mb-4">
            <div
              className="bg-secondary container-fluid"
              style={{ height: "70vh" }}
            >
              {accepted ? (
                <>
                  <i
                    className="fa fa-exclamation fa-10x text-success text-center m-4"
                    style={{ fontSize: "8rem" }}
                  ></i>
                  <div className="text-white container">
                    <p className="display-4"></p>
                    <strong className="w-50">
                      Alle varer må plukkes før bekreftelse kan sendes til kunde
                    </strong>
                  </div>
                </>
              ) : (
                <>
                  <i
                    className="fa fa-check fa-10x text-success text-center m-4"
                    style={{ fontSize: "8rem" }}
                  ></i>
                  <div className="text-white container">
                    <p className="display-4">Orderen er akseptert!</p>
                    <strong className="w-50">
                      Obs!Notere at orderen ikke er ferdig behandlet før varene
                      er plukket og bekreftelse er sendt til kunde. Du har
                      fortsatt mulighet å avvise orderen.
                    </strong>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="row">
            <div className="container">
              {accepted ? (
                <button
                  className="btn btn-lg text-white m-4"
                  style={{
                    backgroundColor: "#000",
                    width: "80%",
                    borderRadius: "0"
                  }}
                  onClick={() => this.handleButtonClick()}
                >
                  OK
                </button>
              ) : (
                <button
                  className="btn btn-lg text-white m-4"
                  style={{
                    backgroundColor: "#000",
                    width: "80%",
                    borderRadius: "0"
                  }}
                  onClick={() => this.handleButtonClick()}
                >
                  Tilbake
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
