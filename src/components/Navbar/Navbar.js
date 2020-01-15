import React from 'react'

const Navbar = props => {

return (
    <button
    className="btn"
    onClick={console.log('dddd')}
  >
    <i
      className="fa fa-arrow-left text-success ml-4 "
      style={{ transform: "scale(1.5, 1)" }}
    />
  </button>
)
}

export default Navbar