import React from "react";

const DeclineView = props => {
  return (
    <div className="row">
      {!props.comfirmed ? (
        <div className="container">
          <h2 className="text-white p-3">Hvorfor vil du avvise ordren?</h2>
          <div className="container text-center">
            <button
              className="btn varner-btn-dark"
              onClick={() =>
                props.handleDeclinedReason("Varen er ikke tilgjengelig")
              }
            >
              Varen er ikke tillgjengelig
            </button>
            <button
              className="btn varner-btn-dark "
              onClick={() => props.handleDeclinedReason("Varen er skadet")}
            >
              Varen er skadet
            </button>
            <button
              className="btn varner-btn-dark "
              onClick={() => props.handleDeclinedReason("Har ikke tid")}
            >
              Har ikke tid
            </button>
            <button
              className="btn varner-btn-dark "
              onClick={() => props.handleDeclinedReason("Annet")}
            >
              Annet
            </button>
          </div>
        </div>
      ) : (
        <div className="container p-4">
          <div className="text-center">
            <i
              className="fa fa-times fa-10x text-success m-4"
              style={{ fontSize: "8rem" }}
            />
            <div className="text-white m-3">
              <strong className="w-50 display-4">Ordren er avvis!</strong>
              <hr />
              <h5>
                Grunn: {props.reason} <br /> Du finner den under "avviste
                ordre"!
              </h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DeclineView;
