import React from "react";
const accepted = (props) => {
	return (
		<div className="container text-center">
			<i className="fa fa-check fa-10x text-success text-center m-4" style={{ fontSize: "8rem" }} />
			<div className="row">
				<p className="display-4">Ordren er akseptert</p>
			</div>
			<hr />
			<div className="row">
				<div className="container m-4">
					<strong className="w-25">
						Obs! Notere at orderen ikke er ferdig behandlet før varene er plukket og bekreftelse er sendt
						til kunde!
						<br />
						Du har fortsatt mulighet å avvise orderen.
					</strong>
				</div>
			</div>
			<div className="row">
				<div className="container text-center">
					<button className="btn varner-btn-green" onClick={() => props.handleButtonClick("packed")}>
						Plukk ordren
					</button>
				</div>
			</div>
		</div>
	);
};
export default accepted;
