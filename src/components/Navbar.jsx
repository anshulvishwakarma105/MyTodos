import React, { useState } from 'react'
import { NavLink } from 'react-router'

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <nav className="navbar navbar-expand-lg bg-primary shadow-sm" data-bs-theme="dark">
      <div className="container-fluid px-3 px-md-4">
        <NavLink
          className="navbar-brand fw-semibold d-flex align-items-center gap-2"
          to="/"
          onClick={() => setNavOpen(prev => !prev)}
        >
          <i className="bi bi-check2-square"></i>
          My Todos
        </NavLink>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setNavOpen(prev => !prev)}
          aria-expanded={navOpen}
          aria-controls="navbarSupportedContent"
          aria-label="Toggle navigation"
          style={{
            outline: "none",
            boxShadow: "none"
          }}
        >
          {navOpen ? <span className="bi bi-x-lg align-self-center"></span> : <span className="navbar-toggler-icon align-self-center"></span>}

        </button>

        <div
          className={`navbar-collapse ${navOpen ? 'd-block' : 'd-none'} d-lg-block`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-1">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link rounded-2 px-3 ${isActive ? 'active fw-semibold bg-white bg-opacity-10' : ''}`
                }
                to="/"
                onClick={() => setNavOpen(prev => !prev)}
              >
                <i className="bi bi-house me-1"></i>
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link rounded-2 px-3 ${isActive ? 'active fw-semibold bg-white bg-opacity-10' : ''}`
                }
                to="/about"
                onClick={() => setNavOpen(prev => !prev)}
              >
                <i className="bi bi-info-circle me-1"></i>
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav >
  )
}