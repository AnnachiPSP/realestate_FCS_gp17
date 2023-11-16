import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ userLogin, setUserLogin, userName, setUserName }) => {

  const navigate = useNavigate()

  const handleClick = () =>{
    navigate("/user/login")
    setUserLogin(false)
    setUserName("")
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to={`/${userName}/home`} className="nav-brand">ThreatBusters RealEstates</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="d-flex navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <Link to={`/${userName}/payments`} className="nav-link">Payments</Link>
              </li>
              <li className="nav-item">
                <Link to={`/${userName}/postppty`} className="btn btn-outline-primary nav-link">Post Property</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {userName}
                </a>
                <ul className="dropdown-menu">
                  <li><Link to={`/${userName}/wishlist`} className="dropdown-item">Wishlist</Link></li>
                  <li><Link to={`/${userName}/bookings`} className="dropdown-item">Bookings and Agreements</Link></li>
                  <li><Link to={`/${userName}/postedppty`} className="dropdown-item">Posted Properties</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item"  onClick = {handleClick}>Sign out</button></li>
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