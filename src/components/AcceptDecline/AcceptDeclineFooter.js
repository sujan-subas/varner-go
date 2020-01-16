import React from "react";

const AcceptDeclineFooter = props => {
  return (
    <div className="container">
      <div className="text-center">
        {!props.comfirmed ? (
          <button
            className="btn varner-btn-dark varner-btn-dark"
            onClick={() => props.handleButtonClick("back")}
          >
            Tilbake til alle ordre
          </button>
        ) : (
          <button
            className="btn varner-btn-dark varner-btn-dark"
            onClick={() => props.handleButtonClick("back")}
          >
            Tilbake til alle ordre
          </button>
        )}
      </div>
    </div>
  );
};
export default AcceptDeclineFooter;
