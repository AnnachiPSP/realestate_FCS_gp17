import React from 'react'
import AdminNavbar from '../adminnavbar'

const AdminDocuments = ({ adminLogin, setAdminLogin }) => {
  return (
    <>
        <AdminNavbar adminLogin={adminLogin} setAdminLogin={setAdminLogin}/>
        <div>AdminDocuments</div>
    </>
  )
}

export default AdminDocuments