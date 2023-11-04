import { useState, useEffect } from 'react'
import Navbar from '../navbar'
import PropertyCard from '../propertycard'
import './style.css'

function UserPage() {

  const [data, setData] = useState("null");

  useEffect(() => {

    fetch('http://localhost:8000/realestate/hello/') 
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }, []);

  console.log(data.sample)

  return (
    <>
      < Navbar />
      <div style={{ marginLeft: '10px' }}>
      <form>
        <div>   
          <input type="radio" className="btn-check" name="options-outlined" id="buying" autocomplete="off" checked />
          <label className="btn btn-outline-primary me-2" htmlFor="buying">BUY</label>
          <input type="radio" className="btn-check" name="options-outlined" id="renting" autocomplete="off"/>
          <label className="btn btn-outline-primary" htmlFor="renting" style={{ marginLeft: '10px' }}>RENT</label>
        </div>
        <div style={{ marginTop: '10px' }}></div>
        <div className="input-group input-group-lg ipclass">
          <span className="input-group-text" >Location</span>
          <input type="text" className="form-control"/>
        </div>
        <div className="input-group input-group-lg mb-3 ipclass">
          <label className="input-group-text">Property Type</label>
          <select className="form-select">
            <option selected>Choose...</option>
            <option value="Full House">Full House</option>
            <option value="PG/Hostel">PG/Hostel</option>
            <option value="Condos">Condos</option>
            <option value="Restaurants">Restaurants</option>
            <option value="Offices">Offices</option>
            <option value="Shopping Complex">Shopping Complex</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      <hr />
      <PropertyCard />
    </div>
    </>
  )
}

export default UserPage