import { useState } from 'react'

function PropertyCard() {

    const type = "Rent";
    
    const [buyButton, setBuyButton] = useState(false);
    const [rentButton, setRentButton] = useState(false);
    const [wishButton, setWishButton] = useState(false);
    const [reportButton, setReportButton] = useState(false);

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
        if(wishButton){
            setWishButton(false)
        } else{
            setWishButton(true)
        }
    }

    const HandleReportButton = () => {
        if(reportButton){
            setReportButton(false)
        } else{
            setReportButton(true)
        }
    }

    if (type == "Sell"){
        return (
            <div>
                <h3>FOR SALE</h3>
                <p>Property Owner: <em>UserName</em></p>
                <p>Location: <em>Somewhere</em></p>
                <p>Property Type: <em>Something</em></p>
                <p>Coast: <em>$$</em></p>
                <p>EMI: <em>$$</em></p>
                <br />
                <div className="btn-group">
                    <a href="#" className={`btn btn-outline-success ${buyButton ? 'active' : ''}`} onClick={HandleBuyButton}>{buyButton ? 'Contacted Owner' : 'Buy'}</a>
                    <a href="#" className={`btn btn-outline-primary ${wishButton ? 'active' : ''}`} onClick={HandleWishButton}>{wishButton ? 'Added to Favs' : 'Wishlist'}</a>
                    <a href="#" className={`btn btn-outline-danger ${reportButton ? 'active' : ''}`} onClick={HandleReportButton}>{reportButton ? 'Reported' : 'Report'}</a>
                </div>
                <hr />
            </div>
        )
    }
    else if(type == "Rent"){
        return (
            <div>
                <h3>FOR LEASE</h3>
                <p>Property Owner: <em>UserName</em></p>
                <p>Location: <em>Somewhere</em></p>
                <p>Property Type: <em>Something</em></p>
                <p>Rent: <em>$$</em></p>
                <p>Deposit: <em>$$</em></p>
                <br />
                <div className="btn-group">
                    <a href="#" className={`btn btn-outline-success ${rentButton ? 'active' : ''}`} onClick={HandleRentButton}>{rentButton ? 'Contacted Owner' : 'Rent'}</a>
                    <a href="#" className={`btn btn-outline-primary ${wishButton ? 'active' : ''}`} onClick={HandleWishButton}>{wishButton ? 'Added to Favs' : 'Wishlist'}</a>
                    <a href="#" className={`btn btn-outline-danger ${reportButton ? 'active' : ''}`} onClick={HandleReportButton}>{reportButton ? 'Reported' : 'Report'}</a>
                </div>
                <hr />
            </div>
        )
    }
}

export default PropertyCard