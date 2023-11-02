import { useState } from 'react'
import Navbar from '../navbar'
import PropertyCard from '../propertycard'

function UserPage() {

  return (
    <div>
      < Navbar />
      <form>
        <div>   
          <input type="radio" className="btn-check" name="options-outlined" id="buying" autocomplete="off" checked />
          <label className="btn btn-outline-primary" htmlFor="buying">BUY</label>
          <input type="radio" className="btn-check" name="options-outlined" id="renting" autocomplete="off"/>
          <label className="btn btn-outline-primary" htmlFor="renting">RENT</label>
        </div>
        <div className="input-group input-group-lg">
          <span className="input-group-text" >Location</span>
          <input type="text" className="form-control"/>
        </div>
        <div className="input-group input-group-lg mb-3">
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
      <br />
      <hr />
      <PropertyCard />
    </div>
  )
}

export default UserPage