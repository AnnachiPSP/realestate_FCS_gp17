import React from 'react'

function UserSignUp() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
    <div className="form-style justify-content-center border border-3 rounded-3">
      <h1 className="font-monospace text-primary">User Signup</h1>
      <form className="form col-md-12 mt-5">
        <div className="form-group">
          <input type="text" className="form-control my-2" placeholder='Username'/>
        </div>
        <div className="form-group">
          <input type="email" className="form-control my-2" placeholder='Email'/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control my-2" placeholder='Password'/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control my-2" placeholder='Confirm Password'/>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">Submit</button>
        <br />
        <br></br>
        <a href="/login" className="blue-link">Already a User</a>
        <br />
        {/* <a href="/admin/login" className="blue-link">ADMIN?</a> */}
      </form>
    </div>
  </div>
  )
}

export default UserSignUp