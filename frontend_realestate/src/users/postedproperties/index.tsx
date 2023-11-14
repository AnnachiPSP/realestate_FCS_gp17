import React, { useState, useEffect } from 'react';
import Navbar from '../navbar';

const PostedProperties = ({ userLogin, setUserLogin, userName, setUserName }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/userproperties/${userName}/`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error:', err);
        setLoading(false);
      });
  }, [userName]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (data === 0) {
    return (
      <>
        <Navbar userLogin={userLogin} setUserLogin={setUserLogin} userName={userName} setUserName={setUserName} />
        <div className='container'><p>No properties found for the user</p></div>
      </>
    )
  }

  return (
    <>
      <Navbar userLogin={userLogin} setUserLogin={setUserLogin} userName={userName} setUserName={setUserName} />
      <div className='container'>
        {data.map((ppty) => (
          <div key={ppty.propertyId}>
            <h3>{ppty.selling_type === 'Buy' ? 'FOR SALE' : 'FOR RENT'}</h3>
            <p>Location: <em>{ppty.location}</em></p>
            <p>Property Type: <em>{ppty.property_type}</em></p>
            {ppty.selling_type === 'Buy' ? (
              <>
                <p>Coast: <em>{ppty.coast}</em></p>
                <p>EMI: <em>{ppty.emi}</em></p>
              </>
            ) : (
              <>
                <p>Rent: <em>{ppty.rent}</em></p>
                <p>Deposit: <em>{ppty.deposit}</em></p>
              </>
            )}
            <br />
            <p>Buyer: <em>{ppty.deal_made !== false ? "Person who bought" : 'None'}</em></p>
            <br />
            <hr />
          </div>
        ))}
      </div>
    </>
  );
};

export default PostedProperties;

