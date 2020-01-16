import React from "react";
const Footer = (props) => {
	return (
		// url background http://i.giphy.com/5lF3pQpdquCBy.gif
		<footer
			style={{
				backgroundImage: "url('http://i.giphy.com/5lF3pQpdquCBy.gif')",
				opacity: "0.2"
			}}
			className="w-100 p-2 bg-center text-center cover"
		>
			<div className="footer-content flex justify-around bg-black-70 w-100">
				<div className="copyright green">© Qlique2020</div>
			</div>
		</footer>
	);
};
export default Footer;
