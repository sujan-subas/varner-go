import React from 'react'

const Navbar = props => {

return (
    <button
    className="btn"
    onClick={props.history.goBack()}
  >
    <i
      className="fa fa-arrow-left text-success ml-4 "
      style={{ transform: "scale(1.5, 1)" }}
    />
  </button>
)
}

export default Navbar