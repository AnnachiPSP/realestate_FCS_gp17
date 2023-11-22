import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from 'bcryptjs';

const UserSignUp = ({ userLogin, setUserLogin, userName, setUserName }) => {

  const [name, setName] = useState("")
  const [mail, SetMail] = useState("")
  const [pass, setPass] = useState("")
  const [repass, setRePass] = useState("")

  const navigate = useNavigate();

  const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };

  const handleSubmit = async () => {
    if(name != "null" && mail != "null" && pass != "null" && repass != "null"){
      if(pass == repass){
        const hashedPassword = await hashPassword(pass);

        const user = {
          UserName : name,
          UserMail : mail,
          UserPassword : hashedPassword,
        }

        fetch('http://127.0.0.1:8000/userdetail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setUserName(name);
            setUserLogin(true);
            navigate(`/${name}/home`);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } else {
        toast("Password not matching");
      }
    } else {
      toast("Enter all the details");
    }
  }
  
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
    <div className="form-style justify-content-center border border-3 rounded-3">
      <h1 className="font-monospace text-primary">User Signup</h1>
      <form className="form col-md-12 mt-5">
        <div className="form-group">
          <input type="text" className="form-control my-2" placeholder='Username' value={name} onChange={(e) => {setName(e.target.value)}}/>
        </div>
        <div className="form-group">
          <input type="email" className="form-control my-2" placeholder='Email' value={mail} onChange={(e) => {SetMail(e.target.value)}}/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control my-2" placeholder='Password' value={pass} onChange={(e) => {setPass(e.target.value)}}/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control my-2" placeholder='Confirm Password' value={repass} onChange={(e) => {setRePass(e.target.value)}}/>
        </div>
        <br />
      </form>
      <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
      <br />
      <a href="/user/login" className="blue-link">Do you have an account ?</a>
      <br />
      <a href="/admin/login" className="blue-link">ADMIN?</a>
    </div>
    <ToastContainer />
  </div>
  )
}

export default UserSignUp