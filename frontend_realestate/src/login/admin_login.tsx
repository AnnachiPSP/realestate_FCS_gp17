import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {

  const navigate = useNavigate();

  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [data, setData] = useState(null);

  const handleSubmit = () => {

    fetch(`http://localhost:8000/adminApi/${name}/`)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    
    if(data != 0){
      console.log(data);
      if(pass == data.AdminPass){

        //sending otp request
        fetch('http://localhost:8000/generate_otp/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
          }),
        });

        navigate('/admin/otpvalid');
      } else {
        toast("Wrong Password!")
      }
    } else {
      toast("No Such Admin!!");
    }
  }


  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="form-style justify-content-center border border-3 rounded-3">
        <h1 className="font-monospace text-primary">Admin Login</h1>
        <form className="form col-md-12 mt-5">
          <div className="form-group">
            <input type="text" className="form-control my-2" placeholder='Username' value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control my-2" placeholder='Password' value={pass} onChange={(e) => setPass(e.target.value)}/>
          </div>
          <br />
          <br />
          <a href="/user/login" className="blue-link">USER ?</a>
        </form>
        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          <br />
          <br />
      </div>
      <ToastContainer />
    </div>
  )
}

export default AdminLogin