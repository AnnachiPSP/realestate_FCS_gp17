import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = ({ adminLogin, setAdminLogin }) => {

    const navigate = useNavigate()

    const handleSignOut = () => {
        setAdminLogin(false)
        navigate('/admin/login')
    }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="/admin/home">ThreatBusters RealEstates</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="d-flex navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link" href="/admin/reported">Reported</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/admin/docs">Documents</a>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-outline-primary" onClick={handleSignOut}>SignOut</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav> 
  )
}

export default AdminNavbar