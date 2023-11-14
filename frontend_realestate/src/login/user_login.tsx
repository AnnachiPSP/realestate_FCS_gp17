import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const UserLogin = ({ userLogin, setUserLogin, userName, setUserName }) => {

  const navigate = useNavigate();

  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [data, setData] = useState(null);

  const handleSubmit = () => {

    fetch(`http://localhost:8000/userNameApi/${name}`)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    
    if(data != 0){
      console.log(data);
      if(pass == data.UserPassword){
        setUserLogin(true);
        setUserName(name);
        navigate(`/${name}/home`);
        console.log("Lexx goo!")
      } else {
        toast("Wrong Password!")
      }
    } else {
      toast("No Such User!!");
    }
  }

  return (

    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="form-style justify-content-center border border-3 rounded-3">
        <h1 className="font-monospace text-primary">User Login</h1>
        <form className="form col-md-12 mt-5">
          <div className="form-group">
            <input type="text" className="form-control my-2" placeholder='Username' value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control my-2" placeholder='Password' value={pass} onChange={(e) => setPass(e.target.value)}/>
          </div>
          <br />
          <a href="/user/signup" className="blue-link">Not a user yet?</a>
          <br />
          <a href="/admin/login" className="blue-link">ADMIN??</a>
          <br />
          <br />
        </form>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default UserLogin;