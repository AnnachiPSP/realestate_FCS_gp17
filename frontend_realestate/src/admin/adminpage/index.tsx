import React from 'react'
import AdminNavbar from '../adminnavbar'

function AdminPage() {

  {/* These values are temporary and needs to be switched with arrays we pulled request from*/}
  const no_of_properties = 0;
  const no_of_bought = 0;
  const no_of_leased = 0;

  return (
    <>
      <AdminNavbar />
      <br />
      <h1>USERS</h1>
      <br />
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              UserName
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>Posted Properties: </strong> {no_of_properties}
              {/* If number of posted properties is greater than 0, print if the property is bought or not! and the details */}
              <br />
              <strong>Properties Bought: </strong> {no_of_bought}
              {/* If number of bought properties is greater than 0, print the details of the seller, the coast and details of the properties */}
              <br />
              <strong>Leased Properties: </strong> {no_of_leased} 
              {/* If number of properties you are paying rent is greater than 0, print if the details of owner and the properties */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminPage