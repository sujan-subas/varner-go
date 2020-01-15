import React from "react";

const AcceptDeclineFooter = props => {
  return (
    <div className="text-center">
      {!props.comfirmed ? (
        <button
          className="btn varner-btn-dark bg-danger"
          onClick={() => props.handleButtonClick("back")}
        >
          Avbryt
        </button>
      ) : (
        <button
          className="btn varner-btn-dark bg-danger"
          onClick={() => props.handleButtonClick("back")}
        >
          Til oversikt
        </button>
      )}
    </div>
  );
};
export default AcceptDeclineFooter;
