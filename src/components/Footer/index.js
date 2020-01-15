import React from "react";
const Footer = props => {
  return (
    // url background http://i.giphy.com/5lF3pQpdquCBy.gif
    <footer
      style={{
        backgroundImage: "url('http://i.giphy.com/5lF3pQpdquCBy.gif')"
      }}
      className="fixed bottom-0 h-10 w-100 mt4 bg-center justify-center flex 
        cover"
    >
      <div className="footer-content flex justify-around bg-black-70 w-100">
        <div className="copyright self-center">
          <a
            href={"https://www.themoviedb.org/"}
            target="_blank"
            rel="noopener noreferrer"
            className="dim link dark-green ma3"
          >
            © The Movie Data Base 2019
          </a>
        </div>
        <button className=" bn ttu bg-black-10 self-center dark-green">
          <h2>Back to Search </h2>
        </button>
      </div>
    </footer>
  );
};
export default Footer;
