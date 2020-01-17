import React from "react";

const AcceptDeclineFooter = props => {
  return (
    <div className="container ">
      <div className="row ">
        <div className="col-12 text-center">
          <button
            className="btn m-4 varner-btn-dark rounded-0"
            onClick={() => props.handleButtonClick("back")}
          >
            Tilbake til ordre
          </button>
        </div>
      </div>
    </div>
  );
};
export default AcceptDeclineFooter;
