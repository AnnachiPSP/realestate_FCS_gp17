import React from 'react'
import Navbar from '../navbar'

const Payments = ({ userLogin, setUserLogin, userName, setUserName }) => {
  return (
    <div>
        <Navbar userLogin={userLogin} setUserLogin={setUserLogin} userName={userName} setUserName={setUserName}/>
        <div>Payments</div>
    </div>
  )
}

export default Payments