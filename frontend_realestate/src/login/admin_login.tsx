import React from 'react'

function AdminLogin() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
    <div className="form-style justify-content-center border border-3 rounded-3">
      <h1 className="font-monospace text-primary">Admin Login</h1>
      <form className="form col-md-12 mt-5">
        <div className="form-group">
          <input type="text" className="form-control my-2" placeholder='Username'/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control my-2" placeholder='Password'/>
        </div>
        <br />
        <br />
        <button type="submit" className="btn btn-primary">Submit</button>
        <br />
        <br />
        <a href="/user/login" className="blue-link">USER ?</a>
      </form>
    </div>
  </div>
  )
}

export default AdminLogin