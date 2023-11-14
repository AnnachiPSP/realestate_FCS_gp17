import {useEffect, useState} from 'react'
import AdminNavbar from '../adminnavbar'

const ReportedList = ({ adminLogin, setAdminLogin }) => {

  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/get_reported_properties')
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        console.log(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <>
      <AdminNavbar adminLogin={adminLogin} setAdminLogin={setAdminLogin} />
      <br /><br />
      <h1>Reported Properties</h1>
      <div className='container'>
      <br />
      {
        data.map((ppty) => (
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
          <p>Reports: <em>{ppty.reports}</em></p>
          <br />
          <hr />
        </div>
        ))
      }
      </div>
    </>
  )
}

export default ReportedList