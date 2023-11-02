import React from 'react';
import './style.css';

const UserLogin = () => {
  return (

    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="form-style justify-content-center border border-3 rounded-3">
        <h1 className="font-monospace text-primary">User Login</h1>
        <form className="form col-md-12 mt-5">
          <div className="form-group">
            <input type="text" className="form-control my-2" placeholder='Username'/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control my-2" placeholder='Password'/>
          </div>
          <br />
          <button type="submit" className="btn btn-primary">Submit</button>
          <br />
          <br />
          <a href="/user/signup" className="blue-link">Not a user yet?</a>
          <br />
          <a href="/admin/login" className="blue-link">ADMIN??</a>
        </form>
      </div>
    </div>
  )
}

export default UserLogin;