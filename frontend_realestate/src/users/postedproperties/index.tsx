import React from 'react'
import Navbar from '../navbar'

function PostedProperties() {

  const type = "Sell"
  const buyer = "Surya"

  if (type == "Sell"){
    return (
      <>
        <Navbar />
        <div className='container'>
          <div>
              <h3>FOR SALE</h3>
              <p>Location: <em>Somewhere</em></p>
              <p>Property Type: <em>Something</em></p>
              <p>Coast: <em>$$</em></p>
              <p>EMI: <em>$$</em></p>
              <br />
              <p>Buyer: <em>{buyer !== null ? buyer : 'None'}</em></p>
              <br />
              <hr />
          </div>
        </div>
      </>
    )

  } else if(type == "Rent"){
      return (
        <>
          <Navbar />
          <div className='container'>
            <div>
                <h3>FOR LEASE</h3>
                <p>Location: <em>Somewhere</em></p>
                <p>Property Type: <em>Something</em></p>
                <p>Rent: <em>$$</em></p>
                <p>Deposit: <em>$$</em></p>
                <br />
                <hr />
            </div>
          </div>
        </>
      )
  }
}

export default PostedProperties