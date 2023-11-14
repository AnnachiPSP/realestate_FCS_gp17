import React from 'react'
import Navbar from '../navbar'

const Bookings = ({ userLogin, setUserLogin, userName, setUserName }) => {
  return (
    <div>
        <Navbar userLogin={userLogin} setUserLogin={setUserLogin} userName={userName} setUserName={setUserName}/>
        <div>Bookings</div>
    </div>
  )
}

export default Bookings