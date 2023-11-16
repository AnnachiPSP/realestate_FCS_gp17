import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminOtp({ setAdminLogin }) {

	const navigate = useNavigate();

  	const [otp, setOtp] = useState('');

	const handleSubmit = () => {

		fetch('http://localhost:8000/validate_otp/', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			name: "surya",
			otp: otp
			}),
		})
		.then((res) => res.json())
		.then((data) => {
				if(data.response == 1){
					setAdminLogin(true)
					navigate(`/admin/home`)
				}
				else{
					toast("Invalid OTP! Please try again")
				} 
		})
		.catch((error) => {
			console.log('Error: ', error);
		});
	}

	const handleRegenerate = () => {
		toast("new OTP Sent!!")
		fetch('http://localhost:8000/generate_otp/', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			  name: "surya",
			}),
		  });
	}

	return (
		<div className='otp-input'>
			<h2>Please enter the OTP sent to your mail!</h2>
			<OtpInput
				value={otp}
				onChange={setOtp}
				numInputs={6}
				renderSeparator={<span>&nbsp;-&nbsp;</span>}
				renderInput={(props) => <input {...props} />}
			/>
			<br />
			<button className="btn btn-primary" onClick={handleSubmit}>SUBMIT</button>
			<button className="btn btn-info" onClick={handleRegenerate}>Regenerate OTP</button>
			<ToastContainer />
		</div>
	);
}