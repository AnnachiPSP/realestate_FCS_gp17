import {useState} from 'react'
import Navbar from '../navbar';
import './style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostProperty = ({ userLogin, setUserLogin, userName, setUserName }) => {

   const [type, setType] = useState("Buy");
   const [val1, setVal1] = useState(null);
   const [val2, setVal2] = useState(null);
   const [loc, setLoc] = useState(null);
   const [pptytype, setPptyType] = useState(null);

   const handleSubmit = () => {

        const pptyRent = {
            user: userName,
            selling_type: type,
            rent: val1,
            deposit: val2,
            location: loc,
            property_type: pptytype
        }

        const pptyBuy = {
            user: userName,
            selling_type: type,
            coast: val1,
            emi: val2,
            location: loc,
            property_type: pptytype
        }

        fetch('http://127.0.0.1:8000/postproperty', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(type == "Buy" ? pptyBuy : pptyRent),
        })
            .then((res) => res.json())
            .then((data) => {
                toast("Property Posted")
            })
            .catch((error) => {
                console.log('Error: ', error);
            })
   }

   if(type == "Buy"){
    return (
        <div>
            <Navbar userLogin={userLogin} setUserLogin={setUserLogin} userName={userName} setUserName={setUserName}/>
            <div className='container ipclass'>
                <form>
                    <div>   
                        <input type="radio" className="btn-check" name="options-outlined" id="buying" autocomplete="off" checked onClick={() => setType("Buy")}/>
                        <label className="btn btn-outline-primary me-2" htmlFor="buying">SALE</label>

                        <input type="radio" className="btn-check" name="options-outlined" id="renting" autocomplete="off" onClick={() => setType("Rent")}/>
                        <label className="btn btn-outline-primary" htmlFor="renting">RENT</label>
                    </div>
                    <br />
                    <div className="input-group input-group-lg mb-2">
                        <span className="input-group-text" >Location</span>
                        <input type="text" className="form-control" value={loc} onChange={(e) => {setLoc(e.target.value)}}/>
                    </div>
                    <div className="input-group input-group-lg mb-3">
                        <label className="input-group-text">Property Type</label>
                        <select className="form-select" value={pptytype} onChange={(e) => {setPptyType(e.target.value)}}>
                            {/* <option selected>Choose...</option> */}
                            <option value="Full House">Full House</option>
                            <option value="PGorHostel">PGorHostel</option>
                            <option value="Condos">Condos</option>
                            <option value="Restaurants">Restaurants</option>
                            <option value="Offices">Offices</option>
                            <option value="Shopping Complex">Shopping Complex</option>
                        </select>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="number" className="form-control" id="floatingTextarea" placeholder="Caost" value={val1} onChange={(e) => {setVal1(e.target.value)}}/>
                        <label htmlFor="floatingTextarea">Cost</label>
                    </div>      
                    <div className="form-floating">
                        <input type="number" className="form-control" id="floatingTextarea" placeholder='Emi' value={val2} onChange={(e) => {setVal2(e.target.value)}}/>
                        <label htmlFor="floatingTextarea">EMI</label>
                    </div>
                    <br />
                </form>
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={handleSubmit}>POST</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
   }
   else if(type == "Rent"){
    return(
        <div>
            <Navbar userLogin={userLogin} setUserLogin={setUserLogin} userName={userName} setUserName={setUserName}/>
            <div className='container ipclass'>
            <form>
                <div>   
                    <input type="radio" className="btn-check" name="options-outlined" id="buying" autocomplete="off" onClick={() => setType("Buy")}/>
                    <label className="btn btn-outline-primary me-2" htmlFor="buying">SALE</label>

                    <input type="radio" className="btn-check" name="options-outlined" id="renting" autocomplete="off" onClick={() => setType("Rent")}/>
                    <label className="btn btn-outline-primary" htmlFor="renting">RENT</label>
                </div>
                <br />
                <div className="input-group input-group-lg mb-2">
                    <span className="input-group-text" >Location</span>
                    <input type="text" className="form-control" value={loc} onChange={(e) => {setLoc(e.target.value)}}/>
                </div>
                <div className="input-group input-group-lg mb-3">
                    <label className="input-group-text">Property Type</label>
                    <select className="form-select" value={pptytype} onChange={(e) => {setPptyType(e.target.value)}}>
                        {/* <option selected>Choose...</option> */}
                        <option value="Full House">Full House</option>
                        <option value="PG/Hostel">PG/Hostel</option>
                        <option value="Condos">Condos</option>
                        <option value="Restaurants">Restaurants</option>
                        <option value="Offices">Offices</option>
                        <option value="Shopping Complex">Shopping Complex</option>
                    </select>
                </div>
                <div className="form-floating mb-2">
                    <input type="number" className="form-control" id="floatingTextarea" placeholder='Rent' value={val1} onChange={(e) => {setVal1(e.target.value)}}/>
                    <label htmlFor="floatingTextarea">Rent</label>
                </div>
                <div className="form-floating">
                    <input type="number" className="form-control" id="floatingTextarea" placeholder='Deposit' value={val2} onChange={(e) => {setVal2(e.target.value)}}/>
                    <label htmlFor="floatingTextarea">Deposit</label>
                </div>
            </form>
            <br />
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={handleSubmit}>POST</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
   }
}

export default PostProperty