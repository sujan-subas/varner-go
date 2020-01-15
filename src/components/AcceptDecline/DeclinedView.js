import React from "react";

const DeclineView = props => {
  return (
    <div className="row">
      {!props.comfirmed ? (
        <div className="container">
          <h2 className="text-white p-3">Hvorfor vil du avvise ordren?</h2>
          <div className="container">
            <button
              className="btn varner-btn-dark p-3 bg-light rounded-0"
              onClick={() => props.handleDeclinedReason("notAvailable")}
            >
              Varen er ikke tillgjengelig
            </button>
            <button
              className="btn varner-btn-dark rounded-0"
              onClick={() => props.handleDeclinedReason("damage")}
            >
              Varen er skadet
            </button>
            <button
              className="btn varner-btn-dark rounded-0"
              onClick={() => props.handleDeclinedReason("noTime")}
            >
              Har ikke tid
            </button>
            <button
              className="btn varner-btn-dark rounded-0"
              onClick={() => props.handleDeclinedReason("other")}
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
            <strong className="w-50 display-4">Ordren er avvis!</strong>
            <hr />
            <h5>
              Fordi: {props.reason}! <br /> Du finner den under "avviste
              ordre"!
            </h5>
          </div>
        </div>
      )}
    </div>
  );
};
export default DeclineView;
