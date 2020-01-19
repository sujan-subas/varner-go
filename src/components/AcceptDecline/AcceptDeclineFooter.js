import React from "react";

const AcceptDeclineFooter = (props) => {
	return (
		<div className="container text-center">
			<div className="row">
				<div className="container text-center">
					<button className="btn varner-btn-dark" onClick={() => props.handleButtonClick("new")}>
						Til alle ordre
					</button>
				</div>
			</div>
		</div>
	);
};
export default AcceptDeclineFooter;
