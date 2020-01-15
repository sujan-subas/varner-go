import React from "react";

const accepted = props => {
  return (
    <div className="row mb-4">
      <div className="container">
        <i
          className="fa fa-check fa-10x text-success text-center m-4"
          style={{ fontSize: "8rem" }}
        />
        <div className="container">
          <p className="display-4">Akseptert Ordren</p>
          <div className="container">
            <strong className="w-25">
              Obs!Notere at orderen ikke er ferdig behandlet før varene er
              plukket og bekreftelse er sendt til kunde. Du har fortsatt
              mulighet å avvise orderen.
            </strong>
          </div>
          <button
            className="btn varner-btn-dark"
            onClick={() => props.handleButtonClick.bind("ok")}
            // alternative onclick for accepted orders?
          >
            Bekreft
          </button>
        </div>
      </div>
    </div>
  );
};
export default accepted;