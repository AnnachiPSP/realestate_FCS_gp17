import { useState, useEffect } from 'react'
import Navbar from '../navbar'
import PropertyCard from '../propertycard'
import './style.css'

const UserPage = ( {userLogin, setUserLogin, userName, setUserName} ) => {

  const [data, setData] = useState(null);
  const [selling_type, setSellingType] = useState("Buy");
  const [loc, setLoc] = useState(null);
  const [pptytype, setPptyType] = useState(null);

  const handleSubmit = () => {
    fetch(`http://127.0.0.1:8000/postproperty/${selling_type}/${loc}/${pptytype}/`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        console.log(data);
      })
      .catch((err) => {
        console.log('Error: ', err);
      })
  }

  return (
    <>
      < Navbar userLogin={userLogin} setUserLogin={setUserLogin} userName={userName} setUserName={setUserName} />
      <div className = "container">
      <form>
        <div>   
          <input type="radio" className="btn-check" name="options-outlined" id="buying" autocomplete="off" checked onClick={() => setSellingType("Buy")}/>
          <label className="btn btn-outline-primary me-2" htmlFor="buying">BUY</label>
          <input type="radio" className="btn-check" name="options-outlined" id="renting" autocomplete="off" onClick={() => setSellingType("Rent")}/>
          <label className="btn btn-outline-primary" htmlFor="renting">RENT</label>
        </div>
        <div style={{ marginTop: '10px' }}></div>
        <div className="input-group input-group-lg ipclass">
          <span className="input-group-text" >Location</span>
          <input type="text" className="form-control" value={loc} onChange={(e) => {setLoc(e.target.value)}}/>
        </div>
        <div className="input-group input-group-lg mb-3 ipclass">
          <label className="input-group-text">Property Type</label>
          <select className="form-select" value={pptytype} onChange={(e) => {setPptyType(e.target.value)}}>
            <option selected>Choose...</option>
            <option value="Full House">Full House</option>
            <option value="PGorHostel">PGorHostel</option>
            <option value="Condos">Condos</option>
            <option value="Restaurants">Restaurants</option>
            <option value="Offices">Offices</option>
            <option value="Shopping Complex">Shopping Complex</option>
          </select>
        </div>
      </form>
      <button className="btn btn-primary" onClick={handleSubmit}>Search</button>
      <br /><br /><br />
      <hr />
      {data !== null && data != 0 ? (
        data
          .filter((ppty) => ppty.deal_made !== 0)
          .map((ppty) => <PropertyCard ppty={ppty} userName={userName}/>)
      ) : (
        <p>No properties found</p>
      )}

    </div>
    </>
  )
}

export default UserPage