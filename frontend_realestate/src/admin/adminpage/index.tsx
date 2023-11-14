import React, { useState, useEffect } from 'react';
import AdminNavbar from '../adminnavbar';

const AdminPage = ({ adminLogin, setAdminLogin }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/userdetail')
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <>
      <AdminNavbar adminLogin={adminLogin} setAdminLogin={setAdminLogin}/>
      <br />
      <h1>USERS</h1>
      <br />
      <div className="accordion" id="accordionExample">
        {data.map((user) => (
          <div className="accordion-item" key={user.UserId}>
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${user.UserId}`}
                aria-expanded={true}
                aria-controls={`collapse${user.UserId}`}
              >
                {user.UserName}
              </button>
            </h2>
            <div
              id={`collapse${user.UserId}`}
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>Mail Id: </strong> {user.UserMail}
                <br />
                {/* Details of Posted Properties */}
                <strong>Posted Properties: </strong> {user.PostedProperties}
                <br />
                {/* Details of bought properties */}
                <strong>Properties Bought: </strong> {user.BoughtProperties}
                <br />
                {/* Details of leased properties */}
                <strong>Leased Properties: </strong> {user.RentedProperties}
                <br />
                {/* Details of Wishlisted properties */}
                <strong>WishListed Properties: </strong> {user.WishListed}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminPage;
