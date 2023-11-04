import React from 'react'

function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">ThreatBusters RealEstates</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="d-flex navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/payments">Payments</a>
              </li>
              <li className="nav-item">
                <a className="btn btn-outline-primary" type="button" href="/postppty">Post Property</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  UserName
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/wishlist">Wishlist</a></li>
                  <li><a className="dropdown-item" href="/bookings">Bookings and Agreements</a></li>
                  <li><a className="dropdown-item" href="/postedppty">Posted Properties</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="/login">Sign out</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
    </nav> 
    <br />
    </>
  )
}

export default Navbar