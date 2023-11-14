import {useEffect, useState} from 'react'
import Navbar from '../navbar'
import PropertyCard from '../propertycard';

const WishList = ({ userLogin, setUserLogin, userName, setUserName }) => {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/get_wishlisted_properties/${userName}/`)
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
    <div>
        <Navbar userLogin={userLogin} setUserLogin={setUserLogin} userName={userName} setUserName={setUserName}/>
        <div className="container">
          {
            data ?
            data.map((ppty) => (
              <PropertyCard ppty={ppty} userName={userName}/>
            )) :
            <p>No wishlistedproperties</p>
          }
        </div>
    </div>
  )
}

export default WishList