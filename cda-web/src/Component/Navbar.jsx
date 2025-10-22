import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <header className="d-flex text-bg-dark flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
          <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
          <span className="fs-4 text-light">College Directory App</span>
        </a>

        <ul className="nav nav-pills fw-bold">
          <li className="nav-item"><Link to="/registeradmin" className="nav-link text-info">Register Admin</Link></li>
          <li className="nav-item"><Link to="/" className="nav-link text-info">Login</Link></li>
          
        </ul>
      </header>
    </>
  )
}

export default Navbar
