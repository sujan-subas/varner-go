import React from "react";

const NoOrdersInDB = () => {
	return (
		<div className="container pt-4">
			<div className="card order-cards p-4 m-4">
				<div className="card-body">
					<div className="card-title">Det er ingen ordre å hente i databasen!</div>
					<hr />
					<div className="card-text">
						Dette kan skyldes at server er nede.<hr />
						Vennligst ta kontakt med teknisk avdeling. <hr />
						Ha en videre fin dag!
					</div>
				</div>
			</div>
		</div>
	);
};

export default NoOrdersInDB;
