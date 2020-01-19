import React from "react";

const AcceptDeclineFooter = (props) => {
	console.log(props);
	return (
		<div className="container text-center ">
			<div className="row">
				<div className="container text-center">
					<button className="btn varner-btn-light" onClick={() => props.handleButtonClick("new")}>
						Til alle ordre
					</button>
				</div>
			</div>
		</div>
	);
};
export default AcceptDeclineFooter;
