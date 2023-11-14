import { useState, useEffect } from 'react'

function PropertyCard({ppty, userName}) {

    const [data, setData] = useState(null);
    const [buyButton, setBuyButton] = useState(false);
    const [rentButton, setRentButton] = useState(false);
    const [wishButton, setWishButton] = useState(false);
    const [reportButton, setReportButton] = useState(false);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/get_wishlisted_properties/${userName}/`)
          .then((response) => response.json())
          .then((result) => {
            setData(result);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }, []);

    useEffect(() => {
        console.log(data);
        if (data && data.length > 0) {
            console.log("Damnn")
            let isWishlisted = false;
    
            for (let i = 0; i < data.length; i++) {
                if (data[i].propertyId === ppty.propertyId) {
                    console.log("true aff")
                    isWishlisted = true;
                    break;
                }
            }
    
            setWishButton(isWishlisted);
        }
    },[])
;
    const type = ppty.selling_type

    const HandleBuyButton = () => {
        if(buyButton){
            setBuyButton(false)
        } else{
            setBuyButton(true)
        }
    }

    const HandleRentButton = () => {
        if(rentButton){
            setRentButton(false)
        } else{
            setRentButton(true)
        }
    }

    const HandleWishButton = () => {
        fetch('http://127.0.0.1:8000/update_wishlist/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                property_id: ppty.propertyId,
                user_name: userName, 
            }),
        })
        .then((response) => response.json())
        .then((result) => {
            if (result.success) {
                setWishButton(!wishButton);
            } else {
                console.log(result)
                console.log(userName)
                console.error('Failed to update Wishlist status');
            }
        })
        .catch((error) => {
            console.error('Error updating Wishlist:', error);
        });
    }

    const HandleReportButton = () => {
        fetch('http://127.0.0.1:8000/update_reports/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                property_id: ppty.propertyId,
                user_name: userName,
            }),
        })
        .then((response) => response.json())
        .then((result) => {
            if (result.success) {
                setReportButton(!reportButton);
            } else {
                console.error('Failed to update report status');
            }
        })
        .catch((error) => {
            console.error('Error updating report:', error);
        });
    }
    

    if (type == "Buy"){
        return (
            <div>
                <h3>FOR SALE</h3>
                <p>Property Owner: <em>{ppty.user}</em></p>
                <p>Location: <em>{ppty.location}</em></p>
                <p>Property Type: <em>{ppty.property_type}</em></p>
                <p>Coast: <em>{ppty.coast}</em></p>
                <p>EMI: <em>{ppty.emi}</em></p>
                <br />
                <div className="btn-group">
                    <button className={`btn btn-outline-success ${buyButton ? 'active' : ''}`} onClick={HandleBuyButton}>{buyButton ? 'Contacted Owner' : 'Buy'}</button>
                    <button className={`btn btn-outline-primary ${wishButton ? 'active' : ''}`} onClick={HandleWishButton}>{wishButton ? 'Added to Favs' : 'Wishlist'}</button>
                    <button className={`btn btn-outline-danger ${reportButton ? 'active' : ''}`} onClick={HandleReportButton}>{reportButton ? 'Reported' : 'Report'}</button>
                </div>
                <hr />
            </div>
        )
    }
    else if(type == "Rent"){
        return (
            <div>
                <h3>FOR LEASE</h3>
                <p>Property Owner: <em>{ppty.user}</em></p>
                <p>Location: <em>{ppty.location}</em></p>
                <p>Property Type: <em>{ppty.property_type}</em></p>
                <p>Rent: <em>{ppty.rent}</em></p>
                <p>Deposit: <em>{ppty.deposit}</em></p>
                <br />
                <div className="btn-group">
                    <button className={`btn btn-outline-success ${rentButton ? 'active' : ''}`} onClick={HandleRentButton}>{rentButton ? 'Contacted Owner' : 'Rent'}</button>
                    <button className={`btn btn-outline-primary ${wishButton ? 'active' : ''}`} onClick={HandleWishButton}>{wishButton ? 'Added to Favs' : 'Wishlist'}</button>
                    <button className={`btn btn-outline-danger ${reportButton ? 'active' : ''}`} onClick={HandleReportButton}>{reportButton ? 'Reported' : 'Report'}</button>
                </div>
                <hr />
            </div>
        )
    }
}

export default PropertyCard