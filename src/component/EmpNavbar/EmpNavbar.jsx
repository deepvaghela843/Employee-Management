import React from 'react'

const EmpNavbar = ({name}) => {
  return (
    <nav className="navbar navbar-light bg-dark">
      <span className="navbar-brand mb-0 h1 text-white mx-3">{name}</span>
    </nav>
  )
}

export default EmpNavbar
